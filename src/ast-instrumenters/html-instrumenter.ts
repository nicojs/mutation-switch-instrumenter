import { AstInstrumenter } from '.';
import { AstFormat } from '../syntax';

export const instrumentHtml: AstInstrumenter<AstFormat.Html> = (
  { root },
  mutantCollector,
  context
) => {
  root.visit({
    visitElement(el) {
      if (el.jsAst) {
        context.instrumenters.js(el.jsAst, mutantCollector, context);
      }
    },
  });
};
