import {Chords} from './collections/Chords';
import {Intervals} from './collections/Intervals';
import {removeItem} from './utilities';

export class AppBootstrap {
  public static Initialize() {
    console.log('Application initialization');
    Chords.LoadChordStructures();
  }
}
