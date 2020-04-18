import { MutantCollector } from '../mutant-collector';
import { instrumentHtml } from './html-instrumenter';
import { instrumentJS } from './js-instrumenter';
import { AstFormat, AstByFormat, Ast } from '../syntax';

export function instrument(ast: Ast, mutantCollector: MutantCollector): void {
  const context: InstrumenterContext = {
    instrumenters: {
      html: instrumentHtml,
      js: instrumentJS,
      ts: instrumentJS,
    },
  };
  switch (ast.format) {
    case AstFormat.Html:
      instrumentHtml(ast, mutantCollector, context);
      break;
    case AstFormat.JS:
      instrumentJS(ast, mutantCollector, context);
      break;
  }
}

export type AstInstrumenter<T extends AstFormat> = (
  ast: AstByFormat[T],
  mutantCollector: MutantCollector,
  context: InstrumenterContext
) => void;

type InstrumentersByFormat = {
  [K in AstFormat]: AstInstrumenter<K>;
};

interface InstrumenterContext {
  instrumenters: InstrumentersByFormat;
}
