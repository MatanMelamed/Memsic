import {atom, DefaultValue, selector} from 'recoil';
import {ChordPolicy, DefaultChordPolicies} from '../scripts/models/ChordPolicy';

export const ChordBuilderState = atom({
  key: 'ChordBuilder',
  default: {
    newChordOnFinish: true,
    newChordDelayTime: 1,
  },
});

export const ChordPoliciesState = atom<ChordPolicy[]>({
  key: 'ChordPoliciesState',
  default: DefaultChordPolicies(),
});

export const EnabledChordPoliciesState = atom<ChordPolicy[]>({
  key: 'EnabledChordPoliciesState',
  default: [] as ChordPolicy[],
});
