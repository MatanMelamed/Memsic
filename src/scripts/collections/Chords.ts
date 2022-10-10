import {Chord} from '../models/Chord';
import {Intervals} from './Intervals';
import {Notes} from './Notes';

import chordStructuresJson from '../../../assets/models/chordStructures.json';
import {ChordStructure} from '../models/ChordStructure';
import {Note} from '..';

export class Chords {
  private static _chordStructures: ChordStructure[] = [];

  static LoadChordStructures(): void {
    this._chordStructures = chordStructuresJson.map(jsonElement => {
      const intervals = jsonElement.intervals.map(i => Intervals.Get(i));
      return new ChordStructure(jsonElement.name, intervals);
    });
  }

  static All(note: Note): Chord[] {
    return this._chordStructures.map(st => new Chord(note, st));
  }

  static RandomChord(): Chord {
    return new Chord(Notes.Random(), Chords.RandomChordStructure());
  }

  private static RandomChordStructure(): ChordStructure {
    return this._chordStructures[
      Math.floor(Math.random() * this._chordStructures.length)
    ];
  }
}
