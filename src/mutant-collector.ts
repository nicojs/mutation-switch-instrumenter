import { Mutant, NamedNodeMutation } from './mutant';
import { types } from '@babel/core';

export class MutantCollector {
  public mutants: Mutant[] = [];
  public unplacedMutants: Mutant[] = [];

  public add(fileName: string, { mutatorName, original, replacement }: NamedNodeMutation): void {
    replacement.end = original.end;
    replacement.start = original.start;
    replacement.loc = original.loc;
    const mutant = new Mutant(this.mutants.length, original, replacement, fileName, mutatorName);
    this.mutants.push(mutant);
    this.unplacedMutants.push(mutant);
  }

  public findUnplacedMutantsInScope(scope: Pick<types.Node, 'start' | 'end'>): Mutant[] {
    return this.unplacedMutants.filter(
      (mutant) => scope.start! <= mutant.replacement.start! && scope.end! >= mutant.replacement.end!
    );
  }

  public markMutantsAsPlaced(mutants: Mutant[]): void {
    this.unplacedMutants = this.unplacedMutants.filter((unplaced) => !mutants.includes(unplaced));
  }
}
