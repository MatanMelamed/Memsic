import {Intervals} from '..';
import {Chord} from './Chord';
import {Interval} from './Interval';

export const enum ChordPolicyType {
  Intervals,
  Chords,
}

// intervals policy

export const enum IntervalsCondition {
  Contains = 'Contains',
  DoesNotContain = 'Does Not Contain',
  Exactly = 'Exactly',
  ExactlyNot = 'Exactly Not',
}

const checkContains = (chord: Chord, intervals: Interval[]): boolean => {
  return chord.ContainsIntervals(intervals);
};

const checkDoesNotContain = (chord: Chord, intervals: Interval[]): boolean => {
  return !chord.ContainsIntervals(intervals);
};

const checkExactly = (chord: Chord, intervals: Interval[]): boolean => {
  return (
    chord.ContainsIntervals(intervals) &&
    chord.Intervals().length === intervals.length
  );
};

const checkExactlyNot = (chord: Chord, intervals: Interval[]): boolean => {
  return !(
    chord.ContainsIntervals(intervals) &&
    chord.Intervals().length === intervals.length
  );
};

const intervalsConditionMap = {
  [IntervalsCondition.Contains]: checkContains,
  [IntervalsCondition.DoesNotContain]: checkDoesNotContain,
  [IntervalsCondition.Exactly]: checkExactly,
  [IntervalsCondition.ExactlyNot]: checkExactlyNot,
};

//

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
    const policyTest = intervalsConditionMap[policy.intervalsCondition];
    return policyTest(chord, policy.intervals);
  }

  return true;
};

export const isChordPassingPolicies = (
  chord: Chord,
  policies: ChordPolicy[],
): boolean => {
  return policies.every(policy => isChordPassingPolicy(chord, policy));
};

export const DefaultChordPolicies = (): ChordPolicy[] => {
  return [
    new ChordPolicy(
      'Major Chords',
      true,
      ChordPolicyType.Intervals,
      IntervalsCondition.Contains,
      [...Intervals.GetAll(['P1', 'M3', 'P5'])],
    ),
    new ChordPolicy(
      'Minor Chords',
      true,
      ChordPolicyType.Intervals,
      IntervalsCondition.Contains,
      [...Intervals.GetAll(['P1', 'm3', 'P5'])],
    ),
  ];
};
