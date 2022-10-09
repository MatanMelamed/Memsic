import {Interval} from './Interval';

export class ChordStructure {
  name: string;
  intervals: Interval[];

  constructor(name: string, intervals: Interval[]) {
    this.name = name;
    this.intervals = intervals;
  }
}
