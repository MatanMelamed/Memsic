import { TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'
import { logRecoil } from '../recoil'



export const LogRecoilButton: React.FC = () => {
    return (
        <View style={{ position: 'absolute', top: 5, left: 5, }}>
            <TouchableOpacity style={{ width: 25, height: 25, backgroundColor: 'red', borderRadius: 10, }} onPress={logRecoil} />
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
