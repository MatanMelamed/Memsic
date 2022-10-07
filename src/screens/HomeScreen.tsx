import { View, Text, Button } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'
import { Intervals } from '../models'

export type HomeScreenParams = NativeStackScreenProps<RootStackParamList, Screens.Home>

export const HomeScreen = ({ navigation }: HomeScreenParams) => {
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button
                title='Chord Completion'
                onPress={() => navigation.navigate(Screens.ChordCompletion)}
            />
        </View>
    )
}
