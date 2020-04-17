import { MutantPlacer } from './mutant-placer';
import { NodePath, types } from '@babel/core';
import { Mutant } from '../mutant';
import {
  createMutatedAst,
  mutantTestExpression,
  mutationCoverageSequenceExpression,
} from '../util/syntax-helpers';

/**
 * Places the mutants with a conditional expressions: `global.activeMutant === 1? mutatedCode : regularCode`;
 */
export const conditionalExpressionMutantPlacer: MutantPlacer = (
  path: NodePath,
  mutants: Mutant[]
): boolean => {
  if (path.isExpression() && !path.parentPath.isObjectProperty()) {
    // First calculated the mutated ast before we start to apply mutants.
    const appliedMutants = mutants.map((mutant) => ({
      mutant,
      ast: createMutatedAst<types.BinaryExpression>(
        path as NodePath<types.BinaryExpression>,
        mutant
      ),
    }));

    // Second add the mutation coverage expression
    path.replaceWith(mutationCoverageSequenceExpression(mutants, path.node));

    // Now apply the mutants
    for (const appliedMutant of appliedMutants) {
      path.replaceWith(
        types.conditionalExpression(
          mutantTestExpression(appliedMutant.mutant.id),
          appliedMutant.ast,
          path.node
        )
      );
    }
    return true;
  } else {
    return false;
  }
};
