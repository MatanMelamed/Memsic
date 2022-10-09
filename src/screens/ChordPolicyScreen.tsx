import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'

export type ChordPolicyScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordPolicy>


const ChordPolicyScreen = ({ navigation }: ChordPolicyScreenParams) => {
    return (
        <View>
            <Text>ChordPolicyScreen</Text>
        </View>
    )
}

export default ChordPolicyScreen