import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, ChordCompletionScreen, RootStackParamList, Screens } from './src/screens';
import { AppBootstrap } from './src/models/AppBootstrap';
import ChordCompletionSettingsScreen from './src/screens/ChordCompletionPreferenceScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Application = () => {
  useEffect(AppBootstrap.Initialize, [])

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={Screens.Home} component={HomeScreen} />
        <RootStack.Screen name={Screens.ChordCompletion} component={ChordCompletionScreen} />
        <RootStack.Screen name={Screens.ChordCompletionSetings} component={ChordCompletionSettingsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


export default Application;