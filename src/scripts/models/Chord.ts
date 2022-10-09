import {Note} from './Note';
import {Interval} from './Interval';
import {ChordStructure} from './ChordStructure';

export class Chord {
  private _chordStructure: ChordStructure;
  private _root: Note;
  private _notes: Note[];

  constructor(root: Note, chordStructure: ChordStructure) {
    this._root = root;
    this._chordStructure = chordStructure;

    this._notes = chordStructure.intervals.map(interval =>
      root.plus(interval.halfSteps),
    );
  }

  public ContainsNotes(notes: Note[]): boolean {
    return notes.every(note => this._notes.includes(note));
  }

  public ContainsIntervals(intervals: Interval[]): boolean {
    return intervals.every(interval =>
      this._chordStructure.intervals.includes(interval),
    );
  }

  public Name(): string {
    return `${this._root.label} ${this._chordStructure.name}`;
  }

  public Intervals(): Interval[] {
    return this._chordStructure.intervals;
  }

  public Notes(): Note[] {
    return this._notes;
  }

  public IntervalsAndNotes(): Array<[interval: Interval, note: Note]> {
    return this._notes.map((n, i) => [this._chordStructure.intervals[i], n]);
  }
}
