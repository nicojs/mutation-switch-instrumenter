import { types } from '@babel/core';
import type { parse as ngHtmlParse } from 'angular-html-parser';
import { AnyNode } from 'angular-html-parser/lib/compiler/src/ml_parser/ast';
import type { ParseLocation } from 'angular-html-parser/lib/compiler/src/parse_util';
import { ParserContext } from './parser-context';
import { offsetLocations } from '../util/syntax-helpers';
import { HtmlAst, AstFormat, html } from '../syntax';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Element } from 'angular-html-parser/lib/compiler/src/ml_parser/ast';

export async function parse(
  text: string,
  originFile: string,
  context: ParserContext
): Promise<HtmlAst> {
  const parserOptions = {
    canSelfClose: true,
    allowHtmComponentClosingTags: true,
    isTagNameCaseSensitive: false,
  };
  const root = await ngHtmlParser(text, originFile, parserOptions, context);

  return Promise.resolve({
    originFile,
    rawContent: text,
    format: AstFormat.Html,
    root,
  });
}

async function ngHtmlParser(
  text: string,
  fileName: string,
  options: Parameters<typeof ngHtmlParse>[1],
  parserContext: ParserContext
): Promise<html.RootNode> {
  const { parse } = await import('angular-html-parser');
  const {
    RecursiveVisitor,
    visitAll,
    Attribute,
    CDATA,
    Comment,
    DocType,
    Element,
    Text,
  } = await import('angular-html-parser/lib/compiler/src/ml_parser/ast');

  const { rootNodes, errors } = parse(text, options);

  if (errors.length !== 0) {
    throw new Error(errors[0].msg);
  }

  const addType = (node: AnyNode): void => {
    if (node instanceof Attribute) {
      node.type = 'attribute';
    } else if (node instanceof CDATA) {
      node.type = 'cdata';
    } else if (node instanceof Comment) {
      node.type = 'comment';
    } else if (node instanceof DocType) {
      node.type = 'docType';
    } else if (node instanceof Element) {
      node.type = 'element';
    } else if (node instanceof Text) {
      node.type = 'text';
    } else {
      throw new Error(`Unexpected node ${JSON.stringify(node)}`);
    }
  };

  const toSourceLocation = (span: ParseLocation): types.SourceLocation['start'] => {
    return {
      column: span.col,
      line: span.line,
    };
  };

  const addLoc = (node: AnyNode): void => {
    if (node.endSourceSpan && node.startSourceSpan) {
      node.loc = {
        start: toSourceLocation(node.startSourceSpan.start),
        end: toSourceLocation(node.endSourceSpan.end),
      };
      node.innerStart = node.startSourceSpan.end.offset;
      node.innerEnd = node.endSourceSpan.start.offset;
    } else {
      node.loc = {
        start: toSourceLocation(node.sourceSpan.start),
        end: toSourceLocation(node.sourceSpan.end),
      };
      node.innerStart = node.sourceSpan.end.offset;
      node.innerEnd = node.sourceSpan.start.offset;
    }
  };

  const getScriptType = (scriptTag: Element): string => {
    const type = scriptTag.attrs.find((attr) => attr.name === 'type');
    if (type) {
      return type.value.toLowerCase();
    } else if (scriptTag.attrs.some((attr) => attr.name === 'src')) {
      return '';
    } else {
      return 'javascript';
    }
  };

  const addProgram = async (el: Element): Promise<void> => {
    if (el.name === 'script') {
      const type = getScriptType(el);
      const content = text.substring(
        el.startSourceSpan!.end.offset,
        el.endSourceSpan!.start.offset
      );
      if (['ts', 'text/typescript', 'typescript'].includes(type)) {
        el.ast = await parserContext.parse(content, fileName, AstFormat.TS);
      } else if (['js', 'text/javascript', 'javascript'].includes(type)) {
        el.ast = await parserContext.parse(content, fileName, AstFormat.JS);
      }
      const offset = el.startSourceSpan!.end;
      offsetLocations(el.ast!.root, {
        position: offset.offset,
        column: offset.col,
        line: offset.line,
      });
    }
  };
  const promises: Promise<void>[] = [];

  visitAll(
    new (class extends RecursiveVisitor {
      visit(node: AnyNode): void {
        addType(node);
        addLoc(node);
      }
      visitElement(node: Element, context: unknown): void {
        promises.push(addProgram(node));
        super.visitElement(node, context);
      }
    })(),
    rootNodes
  );
  await Promise.all(promises);

  const root: html.RootNode = {
    type: 'root',
    children: (rootNodes as unknown) as html.HtmlNode[],
    visit(visitor) {
      visitAll(
        new (class extends RecursiveVisitor {
          visitElement(node: Element, context: unknown): void {
            visitor.visitElement(node);
            super.visitElement(node, context);
          }
        })(),
        rootNodes
      );
    },
  };

  return root;
}
