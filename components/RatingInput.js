import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors.js'
import { scaleX } from '../utils/Scale.js'
import Fonts from '../constants/Fonts.js'

const RatingInput = ({ value, size = Fonts.SMALL, onChange, editable = true }) => {
    return (
        <View style={styles.screen}>
            <Ionicons style={styles.star} name={value > 0 ? 'md-star' : 'md-star-outline'} size={size} onPress={() => editable && onChange(1)} />
            <Ionicons style={styles.star} name={value > 1 ? 'md-star' : 'md-star-outline'} size={size} onPress={() => editable && onChange(2)} />
            <Ionicons style={styles.star} name={value > 2 ? 'md-star' : 'md-star-outline'} size={size} onPress={() => editable && onChange(3)} />
            <Ionicons style={styles.star} name={value > 3 ? 'md-star' : 'md-star-outline'} size={size} onPress={() => editable && onChange(4)} />
            <Ionicons style={styles.star} name={value > 4 ? 'md-star' : 'md-star-outline'} size={size} onPress={() => editable && onChange(5)} />
        </View>
    )
}

export default RatingInput

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
    },
    star: {
        marginRight: scaleX(1),
        color: Colors.PRIMARY,
    }
})