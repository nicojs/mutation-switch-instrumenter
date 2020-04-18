import { AstInstrumenter } from '.';
import { AstFormat } from '../syntax';

export const instrumentHtml: AstInstrumenter<AstFormat.Html> = (
  { root },
  mutantCollector,
  context
) => {
  root.visit({
    visitElement(el) {
      if (el.ast) {
        context.instrument(el.ast, mutantCollector, context);
      }
    },
  });
};
