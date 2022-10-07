import {Note} from '../Note';

export class Notes {
  private static _notes: Note[] = new Array();
  private static _instance: Notes = new Notes();

  static RandomNote(): Note {
    return Notes._notes[Math.floor(Math.random() * Notes._notes.length)];
  }

  static All(): Note[] {
    return this._notes;
  }

  static Get(label: string): Note {
    const note = this._notes.find((note: Note) => {
      note.label == label;
    });

    if (note === undefined) {
      throw 'Note ' + label + ' note found';
    }

    return note;
  }

  private constructor() {
    this.InitializeNotes();
  }

  private InitializeNotes(): void {
    for (let i = 0; i < 7; i++) {
      var char = String.fromCharCode(97 + i).toUpperCase();
      Notes._notes.push(new Note(char, this.getNextNote));
      if (char != 'B' && char != 'E') {
        Notes._notes.push(new Note(char + '#', this.getNextNote));
      }
    }

    Notes._notes
      .filter(
        note =>
          note.label.includes('#') || note.label == 'B' || note.label == 'E',
      )
      .forEach(note => {
        const nextNote = this.getNextNote(1, note);
        note.alternateLabel = nextNote.label + 'b';
      });
  }

  private getNextNote(halfToneOffsetAmount: number, note: Note): Note {
    var nextNoteIndex =
      Math.abs(Notes._notes.indexOf(note) + halfToneOffsetAmount) % 12;
    return Notes._notes[nextNoteIndex];
  }
}
