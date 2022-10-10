import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../assets'

const Separator = () => {
    return (
        <View style={styles.separator}>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        width: '85%',
        borderBottomWidth: 2,
        borderBottomColor: Colors.Grayish,
        alignSelf: 'center',
    }
})

export default Separator