import { NodePath } from '@babel/core';
import { Mutant } from '../mutant';

export interface MutantPlacer {
  (node: NodePath, mutants: Mutant[]): boolean;
}
