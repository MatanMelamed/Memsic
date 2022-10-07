import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from '../assets/Colors';

import { Note, Notes } from '../models';

export type NoteSelectorComponentProps = {
    flex?: number;
    onNotePressed?: (note: Note) => void;
}

const NoteSelectorComponent: React.FC<NoteSelectorComponentProps> = ({
    flex = 1,
    onNotePressed
}) => {

    return (
        <View style={[styles.noteSelectorContainer, { flex: flex }]}>
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
    );
}

const styles = StyleSheet.create({
    noteSelectorContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'green',
    },

    noteButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: Colors.White,
        marginHorizontal: '2%',
        marginVertical: '2%',
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

export default NoteSelectorComponent;