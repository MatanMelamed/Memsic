import {Chords, Intervals, Notes} from '..';
import {Chord} from './Chord';
import {Interval} from './Interval';

export const enum ChordPolicyType {
  Intervals,
  Chords,
}

// intervals policy

export const enum IntervalsCondition {
  ContainsAll = 'Contains All',
  DoesNotContainAny = 'Does Not Contain Any',
  Exactly = 'Exactly',
}

// export const testPolicy = () => {
//   const chords = Chords.All(Notes.Random());

//   const policy = new ChordPolicy(
//     'All',
//     false,
//     ChordPolicyType.Intervals,
//     IntervalsCondition.ExactlyNot,
//     [...Intervals.GetAll(['P1', 'M3', 'P5'])],
//   );

//   chords.forEach(chord => {
//     const isPassing = isChordPassingPolicy(chord, policy);
//     console.log(`${chord.Name()} is${isPassing ? ' ' : ' not '}passing policy`);
//   });
// };

type policyChecker = (chord: Chord, intervals: Interval[]) => boolean;

const checkContains: policyChecker = (chord, intervals) => {
  return chord.ContainsIntervals(intervals);
};

const checkDoesNotContain: policyChecker = (chord, intervals) => {
  return intervals.every(interval => !chord.ContainsIntervals([interval]));
};

const checkExactly: policyChecker = (chord, intervals) => {
  return (
    chord.ContainsIntervals(intervals) &&
    chord.Intervals().length === intervals.length
  );
};

const intervalsConditionMap: {
  [constraint: string]: policyChecker;
} = {
  [IntervalsCondition.ContainsAll]: checkContains,
  [IntervalsCondition.DoesNotContainAny]: checkDoesNotContain,
  [IntervalsCondition.Exactly]: checkExactly,
};

export class ChordPolicy {
  name: string;
  show: boolean;
  type: ChordPolicyType;

  intervalsCondition: IntervalsCondition;
  intervals: Interval[];

  constructor(
    name: string,
    show: boolean,
    type: ChordPolicyType,
    intervalsCondition: IntervalsCondition,
    intervals: Interval[],
  ) {
    this.name = name;
    this.show = show;
    this.type = type;
    this.intervalsCondition = intervalsCondition;
    this.intervals = intervals;
  }
}

export const isChordPassingPolicy = (
  chord: Chord,
  policy: ChordPolicy,
): boolean => {
  if (policy.type === ChordPolicyType.Intervals) {
    const policyChecker = intervalsConditionMap[policy.intervalsCondition];
    const checkerResult = policyChecker(chord, policy.intervals);
    return checkerResult === policy.show;
  }

  return true;
};

export const isChordPassingPolicies = (
  chord: Chord,
  policies: ChordPolicy[],
): boolean => {
  return policies.every(policy => isChordPassingPolicy(chord, policy));
};

export const isSomethingMatchPolicies = (policies: ChordPolicy[]) => {
  const allChords = Chords.All(Notes.Random());
  const passingChords = allChords.filter(chord =>
    isChordPassingPolicies(chord, policies),
  );
  return passingChords.length > 0;
};

export const DefaultChordPolicies = (): ChordPolicy[] => {
  return [
    new ChordPolicy(
      'Major Chords',
      true,
      ChordPolicyType.Intervals,
      IntervalsCondition.ContainsAll,
      [...Intervals.GetAll(['P1', 'M3', 'P5'])],
    ),
    new ChordPolicy(
      'Minor Chords',
      true,
      ChordPolicyType.Intervals,
      IntervalsCondition.ContainsAll,
      [...Intervals.GetAll(['P1', 'm3', 'P5'])],
    ),
    new ChordPolicy(
      '7ths',
      false,
      ChordPolicyType.Intervals,
      IntervalsCondition.DoesNotContainAny,
      [...Intervals.GetAll(['m7', 'M7'])],
    ),
  ];
};
