import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'

import DropDownPicker from 'react-native-dropdown-picker';
import { Interval, Intervals } from '../scripts';
import { removeItem } from '../scripts/utilities';
import { Colors } from '../../assets';


export type ChordPolicyScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordPolicy>

const ChordPolicyScreen = ({ navigation }: ChordPolicyScreenParams) => {
    const [policyName, setPolicyName] = useState('')

    const [actionOpen, setActionOpen] = useState(false);
    const [actionValue, setActionValue] = useState(null);
    const [actionItems, setActionItems] = useState([
        { label: 'Show', value: 'show' },
        { label: 'Hide', value: 'hide' }
    ]);

    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState('Intervals');
    const [typeItems, setTypeItems] = useState([
        // { label: 'Chords', value: 'Chords' },
        { label: 'Intervals', value: 'Intervals' }
    ]);

    const [conditionOpen, setConditionOpen] = useState(false);
    const [conditionValue, setConditionValue] = useState(null);
    const [conditionItems, setConditionItems] = useState([
        { label: 'Contains', value: 'Contains' },
        { label: 'Does not contain', value: 'Does not contain' },
        { label: 'Exactly', value: 'Exactly' },
        { label: 'Exactly not', value: 'Exactly not' },
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

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.screenContainer}>

                {/* Policy Name */}
                <View style={styles.settingContainer}>
                    <View style={styles.settingLabelContainer}>
                        <Text style={styles.settingLabel}>Policy Name</Text>
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
                        <Text style={styles.settingLabel}>Action</Text>
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
                        <Text style={styles.settingLabel}>Type</Text>
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
                        <Text style={styles.settingLabel}>Condition</Text>
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

            </View>

            <View style={styles.controlButtonsContainer}>
                <TouchableOpacity>
                    <Text style={[styles.button, styles.cancelButton]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.button, styles.saveButton]}>
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
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        backgroundColor: Colors.Grayish2,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 32,
        minWidth: 80,
        borderRadius: 10,

        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: Colors.White
    },
    saveButton: {

    },
    cancelButton: {

    }

})

export default ChordPolicyScreen