import minimist from 'minimist';
import glob from 'glob';
import { promisify } from 'util';
import { resolve } from 'path';
import { instrumentAll } from './index';

const globAsPromised = promisify(glob);
const DEFAULT_OUT_DIR = 'instrumented';

cli(process.argv);
export function cli(args: typeof process.argv): void {
  const parsedArgs = minimist(args.slice(2), {
    string: ['out-dir'],
    boolean: ['help', 'h'],
    default: { 'out-dir': DEFAULT_OUT_DIR },
    alias: {
      'out-dir': ['outDir'],
      help: ['h'],
    },
  });
  if (parsedArgs['h'] || parsedArgs['help'] || parsedArgs._.length === 0) {
    printHelp();
  } else {
    const outDir = parsedArgs['out-dir'];
    instrumentGlob(parsedArgs._, outDir).catch(console.error);
  }
}

function printHelp(): void {
  console.log(`
  mutation-switch-instrumenter [glob..]

  Instrument JavaScript/TypeScript code for mutation testing as a Proof of Concept

  Options:
    --help, -h        Show this help
    --out-dir <path>  The out directory to instrument to (default: "${DEFAULT_OUT_DIR}").
                      Set to "." to replace the input files (warning!!!)
  `);
}

async function instrumentGlob(globPatterns: string[], outDir: string): Promise<void> {
  const files = (
    await Promise.all(globPatterns.map((globPattern) => globAsPromised(globPattern)))
  ).flatMap((a) => a);
  const fullOutDir = resolve(outDir);
  console.log(
    `Instrumenting ${files.length} file(s)... ${
      fullOutDir === process.cwd() ? 'in place.' : `to "${outDir}"`
    }`
  );
  await instrumentAll(files, outDir);
}
