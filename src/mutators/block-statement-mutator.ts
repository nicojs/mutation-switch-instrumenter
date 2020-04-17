import { NodeMutator } from './node-mutator';
import { types, NodePath } from '@babel/core';
import { NodeMutation } from '../mutant';

export class BlockStatementMutator implements NodeMutator {
  public name = 'BlockStatement';

  public mutate(path: NodePath): NodeMutation[] {
    if (path.isBlockStatement()) {
      const replacement = types.cloneNode(path.node, false);
      replacement.body = [];
      return [{ original: path.node, replacement }];
    } else {
      return [];
    }
  }
}
