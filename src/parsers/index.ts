import { parse as jsParse } from './js-parser';
import { parse as tsParse } from './ts-parser';
import { parse as htmlParse } from './html-parser';
import path from 'path';
import { Ast } from '../syntax';

export function parse(code: string, filename: string): Promise<Ast> {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.js':
      return jsParse(code, filename);
    case '.ts':
      return tsParse(code, filename);
    case '.vue':
    case '.html':
    case '.htm':
      return htmlParse(code, filename, { parsers: { html: htmlParse, js: jsParse, ts: tsParse } });
    default:
      throw new Error(`Unable to parse ${filename}. No parser registered for ${ext}!`);
  }
}
