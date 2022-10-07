import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import { RootStackParamList, Screens } from './navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import NoteSelectorComponent from '../components/NoteSelectorComponent'
import ChordCompletionQuestionComponent from '../components/ChordCompletion/ChordCompletionQuestionComponent'

import { Chord, Chords, Note } from '../models'
import { Icons, Colors } from '../assets'

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
                <View style={{ flex: 1 }} />

                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Text style={styles.title}>
                        {chordToComplete.root.label} {chordToComplete.label}
                    </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.settingsButton}
                        onPress={() => { navigation.navigate(Screens.ChordCompletionSetings) }}>
                        <Image
                            style={styles.settingsIcon}
                            source={Icons.Preferences}
                        />
                    </TouchableOpacity>
                </View>

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

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },

    titleContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        backgroundColor: Colors.Yellow,
        elevation: 10,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#525053',
    },

    settingsButton: {
        marginRight: '15%',
    },
    settingsIcon: {
        width: 24,
        height: 24,
    }
})