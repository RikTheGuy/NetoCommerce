import React from 'react'
import { StyleSheet, View, TextInput, Text, Switch, } from 'react-native'

import Colors from '../constants/Colors.js'
import Fonts from '../constants/Fonts.js'
import Sizes from '../constants/Sizes.js'

import { scaleX, scaleY } from '../utils/Scale.js'

export const InputField = ({ placeholder = '', value = '', onChangeText, editable = true, style = {}, keyboardType = 'default', secureTextEntry = false, onBlur }) => {
    return (
        <TextInput
            style={{
                ...styles.input,
                color: editable ? Colors.NORMAL : Colors.HINT,
                backgroundColor: editable ? Colors.SECONDARY : Colors.BACKGROUND,
                ...style
            }}
            onEndEditing={onBlur}
            keyboardType={keyboardType}
            placeholderTextColor={Colors.HINT}
            placeholder={placeholder}
            value={value}
            onChangeText={e => onChangeText(e)}
            editable={editable}
            secureTextEntry={secureTextEntry}
        />
    )
}

export const RadioButton = ({ selected, title }) => {
    return (
        <View style={styles.radioContainer}>
            <View style={styles.radio}>
                {
                    selected ?
                        <View
                            style={styles.radioSelection}
                        /> :
                        null
                }
            </View>
            <Text style={{ ...styles.label, marginLeft: scaleX(Sizes.SMALL) }}>{title}</Text>
        </View>
    )
}

export const Toggle = ({ value, onValueChange }) => {
    return (
        <Switch
            trackColor={Colors.HINT}
            thumbColor={Colors.PRIMARY}
            value={value}
            onValueChange={onValueChange}
        />
    )
}

export const Range = ({ min, setMin, max, setMax }) => {

    const validate = () => {
        const _min = parseInt(min)
        if (_min > parseInt(max)) {
            setMax(_min + 1)
        }
    }

    return (
        <View style={{ flexDirection: 'row', flex: 2 }}>
            <InputField placeholder='Min' style={{ flex: 1 }} keyboardType='numeric' value={min.toString()} onChangeText={e => setMin(e)} onBlur={validate} />
            <Text style={{ flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>to</Text>
            <InputField placeholder='Max' style={{ flex: 1 }} keyboardType='numeric' value={max.toString()} onChangeText={e => setMax(e)} onBlur={validate} />
        </View>
    )
}

export const Label = ({ style, children }) => {
    return (
        <Text style={{ ...styles.label, ...style }}>{children}</Text>
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

export const GroupH = ({ children }) => {
    return (
        <View style={styles.groupH}>{children}</View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: scaleY(Fonts.SMALL),
        borderWidth: scaleX(1),
        borderColor: Colors.PRIMARY,
        borderRadius: scaleX(Sizes.SMALL),
        padding: scaleX(Sizes.SMALL),
    },
    radio: {
        height: scaleY(Fonts.MEDIUM),
        width: scaleX(Fonts.MEDIUM),
        borderRadius: Fonts.MEDIUM,
        borderWidth: 2,
        borderColor: Colors.NORMAL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioContainer: {
        flexDirection: 'row'
    },
    radioSelection: {
        height: scaleY(Fonts.MEDIUM - 10),
        width: scaleX(Fonts.MEDIUM - 10),
        borderRadius: 6,
        backgroundColor: Colors.PRIMARY,
    },
    label: {
        color: Colors.PRIMARY,
        fontSize: scaleY(Fonts.MEDIUM),
    },
    title: {
        fontSize: scaleY(Fonts.LARGE),
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    group: {
        marginBottom: scaleY(Sizes.MEDIUM),
    },
    groupH: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleY(Sizes.MEDIUM),
    }
})
