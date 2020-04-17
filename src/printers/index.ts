import { print as htmlPrint } from './html-printer';
import { print as jsPrint } from './js-printer';
import { Ast, AstFormat, AstByFormat } from '../syntax';

export function print(file: Ast): string {
  const context: PrinterContext = {
    printers: {
      html: htmlPrint,
      js: jsPrint,
    },
  };
  switch (file.format) {
    case AstFormat.JS:
      return jsPrint(file, context);
    case AstFormat.Html:
      return htmlPrint(file, context);
  }
}

export type Printer<T extends Ast> = (file: T, context: PrinterContext) => string;

export interface PrinterContext {
  printers: Printers;
}

export type Printers = {
  [Format in AstFormat]: Printer<AstByFormat[Format]>;
};
