import {Note} from './Note';
import {Interval} from './Interval';
import {Intervals} from './collections/Intervals';
import {Notes} from './collections/Notes';
import {Chords} from './collections/Chords';

export type NoteListener = (note: Note) => void;

export type NoteObserver = (noteListener: NoteListener) => void;

export {Note, Interval, Notes, Intervals, Chords};
