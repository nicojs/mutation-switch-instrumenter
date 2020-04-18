import type { types as babelTypes } from '@babel/core';
import * as html from './html';
export { html };

export enum AstFormat {
  Html = 'html',
  JS = 'js',
  TS = 'ts',
}

export interface AstByFormat {
  [AstFormat.Html]: HtmlAst;
  [AstFormat.JS]: JSAst;
  [AstFormat.TS]: TSAst;
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
export interface TSAst extends BaseAst {
  format: AstFormat.TS;
  root: babelTypes.File;
}

export type Ast = HtmlAst | JSAst | TSAst;
