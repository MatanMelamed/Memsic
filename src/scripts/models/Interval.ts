export class Interval {
  name: string;
  notation: string;
  label: string;
  halfSteps: number;

  constructor(
    name: string,
    notation: string,
    label: string,
    halfSteps: number,
  ) {
    this.name = name;
    this.notation = notation;
    this.label = label;
    this.halfSteps = halfSteps;
  }
}
