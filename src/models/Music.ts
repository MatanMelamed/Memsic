import {Chord} from './Chord';
import {Note} from './Note';

export const IsValidSequence = (notes: Note[], chord: Chord) => {
  for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
    var currentInterval = chord.intervals[noteIndex];
    var chordNote = chord.root.plus(currentInterval.halfSteps);

    if (notes[noteIndex] != chordNote) {
      return false;
    }

    return true;
  }
};
