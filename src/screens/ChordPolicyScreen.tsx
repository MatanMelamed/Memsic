import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'

import DropDownPicker from 'react-native-dropdown-picker';
import { Interval, Intervals } from '../scripts';
import { removeItem } from '../scripts/utilities';
import { Colors, theme } from '../../assets';
import { ChordPolicy, ChordPolicyType, IntervalsCondition } from '../scripts/models/ChordPolicy';
import { useRecoilState } from 'recoil';
import { ChordPoliciesState } from '../recoil/chords';
import { LogRecoilButton } from '../components/LogRecoilButton';


export type ChordPolicyScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordPolicy>

const ChordPolicyScreen = ({ navigation }: ChordPolicyScreenParams) => {
    const [policyName, setPolicyName] = useState('')

    const [actionOpen, setActionOpen] = useState(false);
    const [actionValue, setActionValue] = useState('show');
    const [actionItems, setActionItems] = useState([
        { label: 'Show', value: 'show' },
        { label: 'Hide', value: 'hide' }
    ]);

    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState(ChordPolicyType.Intervals);
    const [typeItems, setTypeItems] = useState([
        // { label: 'Chords', value: 'ChordPolicyType.Chords' },
        { label: 'Intervals', value: ChordPolicyType.Intervals }
    ]);

    const [conditionOpen, setConditionOpen] = useState(false);
    const [conditionValue, setConditionValue] = useState(IntervalsCondition.ContainsAll);
    const [conditionItems, setConditionItems] = useState([
        { label: 'Contains All', value: IntervalsCondition.ContainsAll },
        { label: 'Does not contain any', value: IntervalsCondition.DoesNotContainAny },
        { label: 'Exactly', value: IntervalsCondition.Exactly },
    ]);

    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([])

    const onIntervalPress = (interval: Interval): void => {
        if (selectedIntervals.includes(interval)) {
            const newSelectedIntervals = removeItem(selectedIntervals, interval);
            setSelectedIntervals(newSelectedIntervals);
        } else {
            setSelectedIntervals([...selectedIntervals, interval])
        }
    }

    const [chordPolicies, setChordPolicies] = useRecoilState(ChordPoliciesState)

    const isValid = () => {
        return !(!policyName
            || !actionValue
            || (!typeValue && typeValue !== 0)
            || (!conditionValue && conditionValue !== 0)
            || selectedIntervals.length === 0);
    }
    const onSave = () => {
        if (isValid()) {
            console.log('Saving policy')
            // @ts-ignore
            const newChordPolicy = new ChordPolicy(policyName, actionValue === 'show', typeValue, conditionValue, selectedIntervals);
            setChordPolicies([...chordPolicies, newChordPolicy])
            navigation.goBack();
        } else {
            console.log('Policy was not saved')
        }
    }

    const onCancel = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.screenContainer}>
            {/* Policy Name */}
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={theme.mediumLabel}>Policy Name</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <TextInput
                        style={styles.settingTextInput}
                        onChangeText={(v) => setPolicyName(v)}
                        value={policyName}
                    >

                    </TextInput>
                </View>
            </View>

            {/* Action */}
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={theme.mediumLabel}>Action</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <DropDownPicker
                        style={styles.settingValueDropDown}
                        open={actionOpen}
                        value={actionValue}
                        items={actionItems}
                        setOpen={setActionOpen}
                        setValue={setActionValue}
                        setItems={setActionItems}
                        zIndex={3000}
                    />
                </View>
            </View>

            {/* Type */}
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={theme.mediumLabel}>Type</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <DropDownPicker
                        containerStyle={{}}
                        style={styles.settingValueDropDown}
                        open={typeOpen}
                        value={typeValue}
                        items={typeItems}
                        setOpen={setTypeOpen}
                        setValue={setTypeValue}
                        setItems={setTypeItems}
                        zIndex={2000}
                    />
                </View>
            </View>

            {/* Intervals */}
            {/* Intervals condition */}
            <View style={styles.settingContainer}>
                <View style={styles.settingLabelContainer}>
                    <Text style={theme.mediumLabel}>Condition</Text>
                </View>
                <View style={styles.settingValueContainer}>
                    <DropDownPicker
                        containerStyle={{}}
                        style={styles.settingValueDropDown}
                        open={conditionOpen}
                        value={conditionValue}
                        items={conditionItems}
                        setOpen={setConditionOpen}
                        setValue={setConditionValue}
                        setItems={setConditionItems}
                        zIndex={1000}
                    />
                </View>
            </View>

            <View style={[styles.settingContainer, styles.intervalButtonsContainer]}>
                {Intervals.All().map(i => {
                    const isSelected = selectedIntervals.includes(i);

                    return (
                        <TouchableOpacity
                            key={i.label}
                            onPress={() => onIntervalPress(i)}
                        >
                            <Text style={[
                                styles.intervalButton,
                                isSelected ? styles.intervalButtonSelected : styles.intervalButtonUnselected
                            ]}>
                                {i.label}
                            </Text>
                        </TouchableOpacity>);
                })}
            </View>

            <View style={styles.controlButtonsContainer}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={theme.mediumButton}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSave}>
                    <Text style={theme.mediumButton}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    // settings containers
    settingContainer: {
        flexDirection: 'row',
        minHeight: 56,
        marginTop: 8,
        marginHorizontal: 10,
    },
    settingLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingValueContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // settings components
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingTextInput: {
        paddingLeft: 6,
        paddingVertical: 3,
        fontSize: 16,
        fontWeight: '500',
        width: '85%',
        borderBottomWidth: 1,
        color: Colors.Blackish
    },
    settingValueDropDown: {
        alignSelf: 'center',
        width: '90%',
    },

    // intervals selection
    intervalButtonsContainer: {
        borderWidth: 1,
        borderRadius: 9,
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    intervalButton: {
        fontSize: 16,
    },
    intervalButtonSelected: {
        color: Colors.Yellow2,
    },
    intervalButtonUnselected: {
        color: Colors.Grayish,
    },

    screenContainer: {
        flex: 3,
    },

    controlButtonsContainer: {
        flex: 1,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
})

export default ChordPolicyScreen