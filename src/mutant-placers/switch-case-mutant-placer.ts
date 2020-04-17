import { MutantPlacer } from './mutant-placer';
import { types } from '@babel/core';
import {
  memberExpressionChain,
  GLOBAL,
  ACTIVE_MUTANT,
  createMutatedAst,
  mutationCoverageSequenceExpression,
} from '../util/syntax-helpers';

export const switchCaseMutantPlacer: MutantPlacer = (path, mutants) => {
  if (path.isStatement()) {
    // First calculated the mutated ast before we start to apply mutants.
    const appliedMutants = mutants.map((mutant) => ({
      mutant,
      ast: createMutatedAst(path, mutant),
    }));

    // if (path.parentPath.isProgram()) {
    //   path.replaceWith(
    //     types.switchStatement(memberExpressionChain(GLOBAL, ACTIVE_MUTANT), [
    //       ...appliedMutants.map(({ ast, mutant }) =>
    //         types.switchCase(types.numericLiteral(mutant.id), [ast, types.breakStatement()])
    //       ),
    //       types.switchCase(null, [
    //         // Add mutation covering statement
    //         types.expressionStatement(mutationCoverageSequenceExpression(mutants)),
    //         path.node,
    //         types.breakStatement(),
    //       ]),
    //     ])
    //   );
    // } else {
    // Add switch statement
    path.replaceWith(
      types.blockStatement([
        types.switchStatement(memberExpressionChain(GLOBAL, ACTIVE_MUTANT), [
          ...appliedMutants.map(({ ast, mutant }) =>
            types.switchCase(types.numericLiteral(mutant.id), [ast, types.breakStatement()])
          ),
          types.switchCase(null, [
            // Add mutation covering statement
            types.expressionStatement(mutationCoverageSequenceExpression(mutants)),
            path.node,
            types.breakStatement(),
          ]),
        ]),
      ])
    );
    return true;
  } else {
    return false;
  }
};
