export enum Screens {
  Home = 'Home',
  ChordCompletion = 'ChordCompletion',
}

export type RootStackParamList = {
  [Screens.Home]: undefined;
  [Screens.ChordCompletion]: undefined;
};
