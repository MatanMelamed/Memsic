import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackParamList, Screens } from './navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


import { Chord, Chords, Note, Notes } from '../scripts'
import { Colors } from '../../assets'

export type ChordCompletionScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordBuilder>

export const ChordCompletionScreen = ({ navigation }: ChordCompletionScreenParams) => {
    var [chordToComplete, setChordToComplete] = useState<Chord>(Chords.RandomChord())
    var [noteSequence, setNoteSequence] = useState<Note[]>([])

    const onNotePressed = (newNote: Note) => {
        if (chordToComplete.ContainsNotes([newNote])) {
            const newNoteSequence = [...noteSequence, newNote];
            setNoteSequence(newNoteSequence);

            const isFinishedChord = chordToComplete.Notes().every(n => newNoteSequence.includes(n));
            if (isFinishedChord) {
                setTimeout(() => showNewChord(), 1000)
            }
        }
    }

    const showNewChord = () => {
        setNoteSequence([])
        setChordToComplete(Chords.RandomChord())
    }

    return (
        <SafeAreaView style={styles.appContainer}>

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Text style={styles.title}>
                    {chordToComplete.Name()}
                </Text>
            </View>

            {/* Chord Builder Settings */}
            <TouchableOpacity style={styles.settingsButton}
                onPress={() => { navigation.navigate(Screens.ChordBuilderSetings) }}>
            </TouchableOpacity>

            {/* Chord Builder */}
            <View style={styles.chordBuilderContainer}>
                {chordToComplete.IntervalsAndNotes().map(([interval, note]) => {
                    const isNoteFound = noteSequence.includes(note);

                    return (
                        <View key={interval.label} style={styles.intervalsContainer}>
                            <Text style={styles.intervalLabel}>{interval.label}</Text>
                            <Text style={styles.intervalInput}>{isNoteFound ? note.label : " "}</Text>
                        </View>
                    )
                })}
            </View>

            {/* Note Selector */}
            <View style={styles.noteSelectorContainer}>
                {Notes.All().map((note) => (
                    <TouchableOpacity
                        style={styles.noteButton}
                        key={note.label}
                        onPress={() => onNotePressed?.(note)}
                    >

                        <Text style={styles.noteButtonLabel}>
                            {note.label}
                        </Text>

                    </TouchableOpacity>
                ))
                }
            </View >

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },

    // banner
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: Colors.Yellow,
        elevation: 10,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#525053',
    },

    // chord builder settings
    settingsButton: {
        width: 25,
        height: 25,
        borderRadius: 45,
        backgroundColor: Colors.Grayish,

        position: 'absolute',
        top: 26,
        right: 26,
    },

    // chord builder
    chordBuilderContainer: {
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
        color: Colors.Grayish,
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
    },

    // Note selector
    noteSelectorContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },

    noteButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: Colors.White,
        marginHorizontal: 8,
        marginVertical: 16,
        minWidth: '22%',
        textAlign: 'center',
        elevation: 3,
    },

    noteButtonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.Grayish,
        textAlign: 'center'
    }
})