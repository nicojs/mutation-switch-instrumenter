import { ArithmeticOperatorMutator } from './arithmetic-operator-mutator';
import { NodeMutator } from './node-mutator';
import { NodePath } from '@babel/core';
import { BlockStatementMutator } from './block-statement-mutator';
import { ConditionalExpressionMutator } from './conditional-expression-mutator';
import { NamedNodeMutation } from '../mutant';
import { StringLiteralMutator } from './string-literal-mutator';
export * from './node-mutator';
export const mutators: NodeMutator[] = [
  new ArithmeticOperatorMutator(),
  new BlockStatementMutator(),
  new ConditionalExpressionMutator(),
  new StringLiteralMutator(),
];
export const mutate = (node: NodePath): NamedNodeMutation[] => {
  return mutators.flatMap((mutator) =>
    mutator.mutate(node).map((nodeMutation) => ({ ...nodeMutation, mutatorName: mutator.name }))
  );
};
