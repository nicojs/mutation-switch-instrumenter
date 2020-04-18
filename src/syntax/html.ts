import { JSAst, TSAst } from '.';
import { types as babelTypes } from '@babel/core';

export interface Visitor {
  visitElement(el: Element): void;
}

export interface BaseNode {
  loc: babelTypes.SourceLocation;
  type: HtmlNode['type'];
  innerStart: number;
  innerEnd: number;
}

export interface OtherNode extends BaseNode {
  type: 'attribute' | 'root' | 'cdata' | 'comment' | 'docType' | 'text'; // other nodes
}

export interface Element extends BaseNode {
  type: 'element';
  fullName: string;
  ast?: JSAst | TSAst;
}

export interface RootNode {
  type: 'root';
  children: HtmlNode[];
  visit(visitor: Visitor): void;
}

export type HtmlNode = OtherNode | Element;
