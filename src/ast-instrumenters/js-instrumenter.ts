import { AstInstrumenter } from '.';
import traverse from '@babel/traverse';
import { placeMutant } from '../mutant-placers';
import { mutate } from '../mutators';
import { declareGlobal, isTypeAnnotation, isImportDeclaration } from '../util/syntax-helpers';
import { AstFormat } from '../syntax';

export const instrumentJS: AstInstrumenter<AstFormat.JS> = (
  { root, originFile },
  mutantCollector
) => {
  traverse(root, {
    enter(path) {
      if (isTypeAnnotation(path) || isImportDeclaration(path)) {
        // Don't mutate type declarations or import statements
        path.skip();
      } else {
        mutate(path).forEach((mutant) => {
          mutantCollector.add(originFile, mutant);
        });
      }
    },
    exit(path) {
      const mutants = mutantCollector.findUnplacedMutantsInScope(path.node);
      if (placeMutant(path, mutants)) {
        path.skip();
        mutantCollector.markMutantsAsPlaced(mutants);
      }
    },
  });
  root.program.body.unshift(declareGlobal());
};
