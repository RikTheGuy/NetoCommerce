import React from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/Colors'
import Sizes from '../constants/Sizes.js'
import Fonts from '../constants/Fonts.js'
import { scaleX, scaleY } from '../utils/Scale'

const Button = ({ title = '', onPress, fontSize = scaleY(Fonts.MEDIUM), style = {}, centered = false, children = null }) => {
    return (
        <View style={{ ...styles.screen, ...style }}>
            <TouchableNativeFeedback onPress={onPress}>
                <View style={styles.main}>
                    {
                        children != null ? children :
                            <Text style={{ ...styles.text, fontSize, textAlign: centered ? 'center' : 'auto' }}>{title}</Text>
                    }
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    screen: {
        overflow: 'hidden',
        borderRadius: scaleX(Sizes.SMALL),
        elevation: 3,
    },
    main: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.MEDIUM),
    },
    text: {
        color: Colors.SECONDARY,
    }
})