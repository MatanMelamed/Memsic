import {Chord} from './Chord';
import {Interval} from './Interval';

const enum ChordPolicyType {
  Intervals,
  Chords,
}

// intervals policy

const enum IntervalsCondition {
  Contains,
  DoesNotContain,
  Exactly,
  ExactlyNot,
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

export const shouldShowChord = (chord: Chord, policy: ChordPolicy): boolean => {
  if (policy.type === ChordPolicyType.Intervals) {
    const policyTest = intervalsConditionMap[policy.intervalsCondition];
    return policyTest(chord, policy.intervals);
  }

  return true;
};
