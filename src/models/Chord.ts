import {Note} from './Note';
import {Interval} from './Interval';

export class Chord {
  label: string;
  root: Note;
  notes: Note[];
  intervals: Interval[];

  constructor(label: string, root: Note, intervals: Interval[]) {
    this.label = label;
    this.root = root;
    this.intervals = intervals;
    this.notes = [];

    intervals.forEach(interval =>
      this.notes.push(root.plus(interval.halfSteps)),
    );
  }

  public Contains(notes: Note[]): boolean {
    return notes.every(note => this.notes.includes(note));
  }
}
