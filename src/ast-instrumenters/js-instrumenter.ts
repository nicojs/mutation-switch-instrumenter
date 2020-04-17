import { AstInstrumenter } from '.';
import traverse from '@babel/traverse';
import { placeMutant } from '../mutant-placers';
import { mutate } from '../mutators';
import { declareGlobal } from '../util/syntax-helpers';
import { AstFormat } from '../syntax';
import { types } from '@babel/core';

export const instrumentJS: AstInstrumenter<AstFormat.JS> = (
  { root, originFile },
  mutantCollector
) => {
  traverse(root, {
    enter(path) {
      if (
        path.isInterfaceDeclaration() ||
        path.isTypeAnnotation() ||
        types.isTSInterfaceDeclaration(path.node) ||
        types.isTSTypeAnnotation(path.node)
      ) {
        // Don't mutate type declarations
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
