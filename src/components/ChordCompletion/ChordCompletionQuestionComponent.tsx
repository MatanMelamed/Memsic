import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/Colors";

import { Note } from "../../models";
import { Chord } from "../../models/Chord";

export type ChordCompletionQuestionComponentProp = {
    flex?: number;
    chord: Chord,
    noteSequence: Note[]
}

const ChordCompletionQuestionComponent = ({ flex = 1, chord, noteSequence }: ChordCompletionQuestionComponentProp) => {

    return (
        <View style={[styles.chordCompletionQuestionContainer, { ['flex']: flex }]}>
            {chord.intervals.map((interval) => {
                const intervalNote = chord.root.plus(interval.halfSteps);
                const isNoteFound = noteSequence.includes(intervalNote);

                return (
                    <View key={interval.label} style={styles.intervalsContainer}>
                        <Text style={styles.intervalLabel}>{interval.label}</Text>
                        <Text style={styles.intervalInput}>{isNoteFound ? intervalNote.label : " "}</Text>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    chordCompletionQuestionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '10%',
    },

    intervalsContainer: {
        flex: 1,
        alignItems: 'center',
    },
    intervalLabel: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingTop: 18,
        paddingBottom: 34,
    },
    intervalInput: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.Yellow6,

        minWidth: 55,
        backgroundColor: Colors.Grayish,
        borderRadius: 5,
        elevation: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
    }
})

export default ChordCompletionQuestionComponent;