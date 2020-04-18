import { Printer } from '.';
import generate from '@babel/generator';
import { TSAst } from '../syntax';

export const print: Printer<TSAst> = (file) => {
  return (
    '// @ts-nocheck\n' +
    generate(file.root, {
      decoratorsBeforeExport: true,
    }).code
  );
};
