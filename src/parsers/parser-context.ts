import { JSAst, HtmlAst, Ast } from '../syntax';

export interface Parsers {
  js: Parser<JSAst>;
  ts: Parser<JSAst>;
  html: Parser<HtmlAst>;
}

export interface ParserContext {
  parsers: Parsers;
  startLine?: number;
}

export type Parser<T extends Ast = Ast> = (
  text: string,
  fileName: string,
  context: ParserContext
) => Promise<T>;
