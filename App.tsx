import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, ChordCompletionScreen, RootStackParamList, Screens } from './src/screens';
import { AppBootstrap } from './src/scripts/AppBootstrap';
import ChordBuilderSettingsScreen from './src/screens/ChordBuilderSettingsScreen';
import ChordPolicyScreen from './src/screens/ChordPolicyScreen';
import { RecoilRoot } from 'recoil';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Application = () => {
  useEffect(AppBootstrap.Initialize, [])

  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name={Screens.Home} component={HomeScreen} />
          <RootStack.Screen name={Screens.ChordPolicy} component={ChordPolicyScreen} />
          <RootStack.Screen name={Screens.ChordBuilder} component={ChordCompletionScreen} />
          <RootStack.Screen name={Screens.ChordBuilderSetings} component={ChordBuilderSettingsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}


export default Application;