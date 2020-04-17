import 'angular-html-parser/lib/compiler/src/ml_parser/ast';
import { ParseSourceSpan } from 'angular-html-parser/lib/compiler/src/parse_util';
import { html } from '../syntax';

declare module 'angular-html-parser/lib/compiler/src/ml_parser/ast' {
  export interface OtherNode extends Node, html.OtherNode {
    endSourceSpan: ParseSourceSpan | null | undefined;
    startSourceSpan: ParseSourceSpan | null | undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Element extends html.Element {}
  export type AnyNode = OtherNode | Element;
}
