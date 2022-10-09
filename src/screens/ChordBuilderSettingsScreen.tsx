import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import { Colors } from '../../assets'


const ChordBuilderSettingsScreen = () => {

    const [newChordOnCompletion, setNewChordOnCompletion] = useState(false)

    const [newChordTimeDelay, setNewChordTimeDelay] = useState(1);


    return (
        <View style={styles.allSettingsContainer}>

            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={styles.settingLabel}>New chord on finish</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Switch
                        onValueChange={() => { setNewChordOnCompletion(!newChordOnCompletion) }}
                        value={newChordOnCompletion}
                    />
                </View>
            </View>

            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={styles.settingLabel}>New chord time delay</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Slider
                        disabled={!newChordOnCompletion}
                        style={{ width: '85%', height: 40 }}
                        step={1}
                        minimumValue={1}
                        maximumValue={10}
                        value={newChordTimeDelay}
                        onValueChange={(v) => { setNewChordTimeDelay(v) }}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={{ color: Colors.Grayish }}>
                        {newChordTimeDelay}
                    </Text>
                </View>
            </View>

        </View >
    )
}


const styles = StyleSheet.create({
    allSettingsContainer: {

    },

    settingContainer: {
        height: 45,
        flexDirection: 'row',
        borderWidth: 1
    },
    settingLabelContainer: {
        borderWidth: 1,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    settingValueContainer: {
        borderWidth: 1,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    settingLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.Grayish
    },
})

export default ChordBuilderSettingsScreen