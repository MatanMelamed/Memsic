export enum Screens {
  Home = 'Home',
  ChordCompletion = 'ChordCompletion',
  ChordCompletionSetings = 'ChordCompletionSettings',
}

export type RootStackParamList = {
  [Screens.Home]: undefined;
  [Screens.ChordCompletion]: undefined;
  [Screens.ChordCompletionSetings]: undefined;
};
