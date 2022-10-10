import {atom, DefaultValue, selector} from 'recoil';
import {ChordPolicy} from '../scripts/models/ChordPolicy';

export const ChordBuilderState = atom({
  key: 'ChordBuilderState',
  default: {
    chordPolicies: [] as ChordPolicy[],
  },
});

export const ChordPoliciesState = selector<ChordPolicy[]>({
  key: 'ChordPolicies',
  get: ({get}) => {
    const chordBuilderState = get(ChordBuilderState);
    return chordBuilderState.chordPolicies;
  },
  set: ({get, set}, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }

    let chordBuilderState = get(ChordBuilderState);
    chordBuilderState.chordPolicies = newValue;
    console.log(chordBuilderState);
    set(ChordBuilderState, chordBuilderState);
  },
});
