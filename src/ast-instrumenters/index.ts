import { MutantCollector } from '../mutant-collector';
import { instrumentHtml } from './html-instrumenter';
import { instrumentJS } from './js-instrumenter';
import { AstFormat, AstByFormat, Ast } from '../syntax';

export function instrument(ast: Ast, mutantCollector: MutantCollector): Ast {
  const context: InstrumenterContext = {
    instrument: instrument,
  };
  switch (ast.format) {
    case AstFormat.Html:
      instrumentHtml(ast, mutantCollector, context);
      return ast;
    case AstFormat.JS:
      instrumentJS(ast, mutantCollector, context);
      return ast;
    case AstFormat.TS:
      instrumentJS(ast, mutantCollector, context);
      return ast;
  }
}

export type AstInstrumenter<T extends AstFormat> = (
  ast: AstByFormat[T],
  mutantCollector: MutantCollector,
  context: InstrumenterContext
) => void;

interface InstrumenterContext {
  instrument: AstInstrumenter<AstFormat>;
}
