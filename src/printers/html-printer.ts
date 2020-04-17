import { Printer } from '.';
import { HtmlAst } from '../syntax';

export const print: Printer<HtmlAst> = (ast, context) => {
  const scripts: { start: number; end: number; replacement: string }[] = [];
  ast.root.visit({
    visitElement(el) {
      if (el.jsAst) {
        scripts.push({
          start: el.innerStart,
          end: el.innerEnd,
          replacement: `\n${context.printers.js(el.jsAst, context)}\n`,
        });
      }
    },
  });
  const sortedScripts = scripts.sort((a, b) => a.start - b.start);
  let currentIndex = 0;
  let html = '';
  for (const script of sortedScripts) {
    html += ast.rawContent.substring(currentIndex, script.start);
    html += script.replacement;
    currentIndex = script.end;
  }
  html += ast.rawContent.substr(currentIndex);
  return html;
};
