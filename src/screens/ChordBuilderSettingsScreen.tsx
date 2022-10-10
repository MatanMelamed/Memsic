import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import { Colors, theme } from '../../assets'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'
import { spacing } from '../../assets/theme/theme'
import { useRecoilState } from 'recoil'
import { ChordBuilderState as ChordBuilderSettingsState, ChordPoliciesState, EnabledChordPoliciesState } from '../recoil/chords'
import { ChordPolicy } from '../recoil'
import Separator from '../components/Separator'

import { CheckIcon, PlusIcon, XMarkIcon } from "react-native-heroicons/solid";
import { removeItem } from '../scripts/utilities'



export type ChordBuilderSettingsScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordBuilderSetings>

const ChordBuilderSettingsScreen = ({ navigation }: ChordBuilderSettingsScreenParams) => {

    const [chordBuilderSettings, setChordBuilderSettings] = useRecoilState(ChordBuilderSettingsState)
    const onNewChordFinish = () => {
        const newSettings = {
            ...chordBuilderSettings,
            newChordOnFinish: !chordBuilderSettings.newChordOnFinish
        }
        setChordBuilderSettings(newSettings);
    }
    const onNewChordDelayTime = (newDelayTime: number) => {
        const newSettings = {
            ...chordBuilderSettings,
            newChordDelayTime: newDelayTime
        }
        setChordBuilderSettings(newSettings);
    }

    const [chordPolicies, _] = useRecoilState<ChordPolicy[]>(ChordPoliciesState)
    const [enabledPolicies, setEnabledPolicies] = useRecoilState<ChordPolicy[]>(EnabledChordPoliciesState)
    const onPolicyToggle = (policy: ChordPolicy): void => {
        if (enabledPolicies.includes(policy)) {
            const newEnabledPolicies = removeItem(enabledPolicies, policy)
            setEnabledPolicies(newEnabledPolicies)
        } else {
            setEnabledPolicies([...enabledPolicies, policy])
        }
    }


    return (

        <View style={styles.allSettingsContainer}>
            {/* On Chord Completed*/}
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={styles.settingLabel}>New chord on finish</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Switch
                        onValueChange={onNewChordFinish}
                        value={chordBuilderSettings.newChordOnFinish}
                    />
                </View>
            </View>
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={styles.settingLabel}>New chord time delay</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <Slider
                        disabled={!chordBuilderSettings.newChordOnFinish}
                        style={{ width: '85%', height: 40 }}
                        step={1}
                        minimumValue={1}
                        maximumValue={9}
                        value={chordBuilderSettings.newChordDelayTime}
                        onValueChange={onNewChordDelayTime}
                        minimumTrackTintColor={Colors.Yellow3}
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={{ color: Colors.Grayish }}>
                        {chordBuilderSettings.newChordDelayTime}
                    </Text>
                </View>
            </View>

            {/* Policies */}
            <View style={styles.policiesContainer}>
                <Text style={styles.policiesTitle}>Policies</Text>

                <TouchableOpacity onPress={() => navigation.navigate(Screens.ChordPolicy)}>
                    <Text style={[theme.mediumButton, { marginTop: spacing.medium }]}>New</Text>
                </TouchableOpacity>

                <ScrollView>
                    {chordPolicies.map(policy => {
                        const intervals = policy.intervals.map(i => i.label)
                        return (
                            <View key={policy.name}>
                                <View style={styles.policyEntry}>
                                    <Text style={theme.smallLabel}>{policy.name}</Text>
                                    <Text style={theme.smallLabel}>{policy.show ? 'Show' : 'Hide'}</Text>
                                    <Text style={theme.smallLabel}>{policy.intervalsCondition}</Text>
                                    <Text style={theme.smallLabel}>{intervals}</Text>
                                    <TouchableOpacity onPress={() => onPolicyToggle(policy)}>
                                        {enabledPolicies.includes(policy)
                                            ? <XMarkIcon color={Colors.Grayish} />
                                            : <PlusIcon color={Colors.Grayish} />}

                                    </TouchableOpacity>
                                </View>
                                <Separator />
                            </View>

                        );
                    })}
                </ScrollView>
            </View>

        </View >
    )
}


const styles = StyleSheet.create({
    allSettingsContainer: {
        flex: 1,
    },

    settingContainer: {
        height: 45,
        flexDirection: 'row',
    },
    settingLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    settingValueContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    settingLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.Blackish
    },


    // Policies
    policiesContainer:
    {
        // flex: 1, borderColor: 'red', borderWidth: 1
    },

    policiesTitle: {
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
        color: Colors.Blackish
    },

    policyEntry: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: spacing.medium,
    },
})

export default ChordBuilderSettingsScreen