import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Fonts from '../../constants/Fonts.js'
import Colors from '../../constants/Colors.js'

import { scaleY } from '../../utils/Scale.js'

const Terms = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>*Cricket Noises*</Text>
            <Text style={styles.smallText}>Nothing to See Here</Text>
        </View>
    )
}

export default Terms

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND
    },
    text: {
        textAlign: 'center',
        fontSize: scaleY(Fonts.LARGE),
        color: Colors.PRIMARY
    },
    smallText: {
        textAlign: 'center',
        fontSize: scaleY(Fonts.SMALL),
        color: Colors.PRIMARY
    }
})