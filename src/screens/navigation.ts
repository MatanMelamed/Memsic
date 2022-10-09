export enum Screens {
  Home = 'Home',
  ChordBuilder = 'ChordBuilder',
  ChordBuilderSetings = 'ChordBuilderSettings',
  ChordPolicy = 'ChordPolicy',
}

export type RootStackParamList = {
  [Screens.Home]: undefined;
  [Screens.ChordBuilder]: undefined;
  [Screens.ChordBuilderSetings]: undefined;
  [Screens.ChordPolicy]: undefined;
};
