import {useRecoilState, useSetRecoilState} from 'recoil';
import {ChordPolicy} from '../recoil';
import {ChordPoliciesState} from '../recoil/chords';
import {Chords} from './collections/Chords';
import {Intervals} from './collections/Intervals';
import {ChordPolicyType, IntervalsCondition} from './models/ChordPolicy';
import {removeItem} from './utilities';

export class AppBootstrap {
  public static Initialize() {
    console.log('Application initialization');
    Chords.LoadChordStructures();
  }
}
