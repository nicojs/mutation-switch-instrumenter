import { conditionalExpressionMutantPlacer } from './conditional-expression-mutant-placer';
export * from './mutant-placer';
import { MutantPlacer } from './mutant-placer';
import { switchCaseMutantPlacer } from './switch-case-mutant-placer';
export const mutantPlacers: MutantPlacer[] = [
  conditionalExpressionMutantPlacer,
  switchCaseMutantPlacer,
];
export const placeMutant: MutantPlacer = (node, mutants) => {
  if (mutants.length) {
    for (const placer of mutantPlacers) {
      try {
        if (placer(node, mutants)) {
          return true;
        }
      } catch (error) {
        throw new Error(
          `Error while placing mutants on ${node.node.loc?.start.line}:${node.node.loc?.start.column}. ${error.stack}`
        );
      }
    }
  }
  return false;
};
