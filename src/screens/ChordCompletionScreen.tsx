import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ChordCompletionQuestionComponent from '../components/ChordCompletion/ChordCompletionQuestionComponent'
import NoteSelectorComponent from '../components/NoteSelectorComponent'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from './navigation'
import { Chords, Intervals, Note, NoteListener, NoteObserver, Notes } from '../models'
import { Chord } from '../models/Chord'
import { IsValidSequence } from '../models/Music'
import { Colors } from '../assets/Colors'

export type ChordCompletionScreenParams = NativeStackScreenProps<RootStackParamList, Screens.ChordCompletion>

export const ChordCompletionScreen = ({ navigation }: ChordCompletionScreenParams) => {
    var [chordToComplete, setChordToComplete] = useState<Chord>(Chords.RandomChord())
    var [noteSequence, setNoteSequence] = useState<Note[]>([])

    const onNotePressed = (newNote: Note) => {
        if (chordToComplete.Contains([newNote])) {
            setNoteSequence([...noteSequence, newNote]);
        }
    }

    return (
        <SafeAreaView style={styles.appContainer}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {chordToComplete.root.label} {chordToComplete.label}
                </Text>
            </View>

            <ChordCompletionQuestionComponent
                flex={2}
                chord={chordToComplete}
                noteSequence={noteSequence}
            />

            <NoteSelectorComponent
                flex={3}
                onNotePressed={onNotePressed}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    titleContainer: {
        paddingVertical: 16,
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Yellow,
        elevation: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#525053'
    },
})