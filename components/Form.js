import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'

import Colors from '../constants/Colors.js'
import Fonts from '../constants/Fonts.js'
import Sizes from '../constants/Sizes.js'

import { scaleX, scaleY } from '../utils/Scale.js'

export const InputField = ({ placeholder = '', value = '', onChangeText, editable = true }) => {
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor={Colors.HINT}
            placeholder={placeholder}
            value={value}
            onChangeText={e => onChangeText(e)}
            editable={editable}
        />
    )
}

export const Label = ({ children }) => {
    return (
        <Text style={styles.label}>{children}</Text>
    )
}

export const Title = ({ children }) => {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export const Group = ({ children }) => {
    return (
        <View style={styles.group}>{children}</View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: scaleY(Fonts.SMALL),
        borderWidth: scaleX(1),
        borderColor: Colors.PRIMARY,
        borderRadius: scaleX(Sizes.SMALL),
        padding: scaleX(Sizes.SMALL),
        color: Colors.NORMAL
    },
    label: {
        color: Colors.PRIMARY,
        fontSize: scaleY(Fonts.NORMAL),
    },
    title: {
        fontSize: scaleY(Fonts.LARGE),
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    group: {
        marginBottom: scaleY(Sizes.MEDIUM),
    },
})