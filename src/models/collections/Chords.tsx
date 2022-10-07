import { Chord } from "../Chord";
import { Intervals } from "./Intervals";
import { Notes } from "./Notes";

export class Chords {
    static RandomChord(): Chord {
        return new Chord('Major', Notes.RandomNote(), Intervals.MajorChordIntervals());
    }
}