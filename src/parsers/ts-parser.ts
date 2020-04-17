import { types } from '@babel/core';
import { parseAsync } from '@babel/core';
import { AstFormat, JSAst } from '../syntax';

export async function parse(text: string, fileName: string): Promise<JSAst> {
  const ast = await parseAsync(text, {
    filename: fileName,
    presets: ['@babel/preset-typescript'],
  });
  if (types.isProgram(ast)) {
    throw new Error('Expected ${filename} to contain a babel.types.file, but was a program');
  }
  return {
    originFile: fileName,
    rawContent: text,
    format: AstFormat.JS,
    root: ast!,
  };
}
