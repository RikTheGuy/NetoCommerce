import React from 'react'
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors.js'

import { scaleX, scaleY } from '../utils/Scale.js'

const FAB = ({ fontSize, iconName, onPress }) => {
    return (
        <View style={styles.screen}>
            <TouchableNativeFeedback onPress={onPress}>
                <View style={styles.container}>
                    <Ionicons style={styles.text} name={iconName} size={scaleY(fontSize)} />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default FAB

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: scaleX(75),
        height: scaleY(70),
        margin: scaleX(20),
        zIndex: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.PRIMARY,
        borderRadius: scaleX(40),
        overflow: 'hidden',
        elevation: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.SECONDARY,
    }
})