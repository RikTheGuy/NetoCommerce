import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors.js'
import Fonts from '../constants/Fonts.js'
import { scaleY } from '../utils/Scale.js'

const Message = ({ message, danger, style = {} }) => {
    const activeStyle = danger ? styles.danger : styles.success
    return (
        <Text style={{ ...activeStyle, ...style }}>{message}</Text>
    )
}

export default Message

const styles = StyleSheet.create({
    danger: {
        color: Colors.DANGER,
        fontSize: scaleY(Fonts.MEDIUM)
    },
    success: {
        color: Colors.PRIMARY,
        fontSize: scaleY(Fonts.MEDIUM)
    }
})