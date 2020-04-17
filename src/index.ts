import { promises as fs } from 'fs';
import path from 'path';
import { parse } from './parsers';
import { MutantCollector } from './mutant-collector';
import { print } from './printers';
import { instrument } from './ast-instrumenters';
import chalk from 'chalk';
import { sourceFileLocation } from './util/char-helpers';

async function instrumentCode(
  code: string,
  fileName: string,
  mutantCollector: MutantCollector
): Promise<string> {
  const ast = await parse(code, fileName);
  instrument(ast, mutantCollector);
  if (mutantCollector.unplacedMutants.length) {
    throw new Error(
      `${fileName}: Couldn't place mutants ${mutantCollector.unplacedMutants.map((m) =>
        JSON.stringify(m)
      )}`
    );
  }
  return print(ast);
}

export async function instrumentAll(files: string[], outDir: string): Promise<void> {
  const resolveOutDir = path.resolve.bind(path, process.cwd(), outDir);
  const mutantCollection = new MutantCollector();
  const contentByFile: {
    [fileName: string]: string;
  } = Object.create(null);

  for await (const fileName of files) {
    try {
      const textContent = await fs.readFile(fileName, 'utf8');
      contentByFile[fileName] = textContent;
      const instrumented = await instrumentCode(textContent, fileName, mutantCollection);
      const outFile = resolveOutDir(path.relative(process.cwd(), fileName));
      await fs.mkdir(path.dirname(outFile), { recursive: true });
      await fs.writeFile(outFile, instrumented, 'utf8');
      console.log(
        `✅ ${path.relative(process.cwd(), fileName)} -> ${path.relative(process.cwd(), outFile)}`
      );
    } catch (error) {
      throw new Error(`Error in file ${fileName}, ${error.stack}`);
    }
  }

  mutantCollection.mutants.forEach((mutant) => {
    console.log(
      `[${mutant.id}] ${sourceFileLocation(mutant.fileName, mutant.original.loc!.start)}`
    );

    mutant
      .originalLines(contentByFile[mutant.fileName])
      .split('\n')
      .forEach((line) => {
        console.log(chalk.red('-   ' + line));
      });
    mutant
      .mutatedLines(contentByFile[mutant.fileName])
      .split('\n')
      .forEach((line) => {
        console.log(chalk.green('+   ' + line));
      });
    console.log('');
  });
}
