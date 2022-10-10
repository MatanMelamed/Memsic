import {Interval} from '../models/Interval';

import intervals from '../../../assets/models/intervals.json';

export class Intervals {
  private static _intervals: Interval[] = intervals;
  private static _intervalsDict: {[label: string]: Interval} = Object.assign(
    {},
    ...intervals.map(i => ({[i.label]: i})),
  );

  public static MajorChordIntervals(): Interval[] {
    return new Array(
      Intervals.Get('P1'),
      Intervals.Get('M3'),
      Intervals.Get('P5'),
    );
  }

  public static All(): Interval[] {
    return this._intervals;
  }

  public static Get(label: string): Interval {
    let interval = Intervals._intervalsDict[label];
    if (interval === undefined) {
      throw `Interval ${label} was not found`;
    }

    return Intervals._intervalsDict[label];
  }

  public static GetAll(label: string[]): Interval[] {
    return label.map(l => this.Get(l));
  }

  public static Random(): Interval {
    return this._intervals[Math.floor(Math.random() * this._intervals.length)];
  }
}
