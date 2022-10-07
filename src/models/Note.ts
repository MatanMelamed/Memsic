export class Note {
  label: string;
  alternateLabel: string;
  plus: (halfToneOffsetAmount: number) => Note;
  minus: (halfToneOffsetAmount: number) => Note;

  constructor(
    label: string,
    getNextNote: (halfToneOffsetAmount: number, note: Note) => Note,
  ) {
    this.label = label;
    this.alternateLabel = label;

    this.plus = (halfToneOffsetAmount: number) =>
      getNextNote(halfToneOffsetAmount, this);

    this.minus = (halfToneOffsetAmount: number) =>
      getNextNote(halfToneOffsetAmount, this);
  }
}
