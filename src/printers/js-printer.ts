import { Printer } from '.';
import generate from '@babel/generator';
import { JSAst } from '../syntax';

export const print: Printer<JSAst> = (file) => {
  return generate(file.root).code;
};
