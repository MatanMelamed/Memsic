import { TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import { logRecoil } from '../recoil'

const LogRecoilButton = () => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={logRecoil}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    button: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        borderRadius: 10,
    }
})

export default LogRecoilButton