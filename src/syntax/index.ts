import type { types as babelTypes } from '@babel/core';
import * as html from './html';
export { html };

export enum AstFormat {
  Html = 'html',
  JS = 'js',
}

export interface AstByFormat {
  [AstFormat.Html]: HtmlAst;
  [AstFormat.JS]: JSAst;
}

export interface BaseAst {
  originFile: string;
  rawContent: string;
  root: Ast['root'];
}

export interface HtmlAst extends BaseAst {
  format: AstFormat.Html;
  root: html.RootNode;
}
export interface JSAst extends BaseAst {
  format: AstFormat.JS;
  root: babelTypes.File;
}

export type Ast = HtmlAst | JSAst;
