import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Sizes from '../constants/Sizes'
import { scaleX, scaleY } from '../utils/Scale'

import { Ionicons } from '@expo/vector-icons'
import image from '../images/product_image.jpg'

import { editItem } from '../store/actions/CartActions.js'

const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <Image source={image} style={styles.img} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} X {item.quantity}</Text>
            <View style={styles.removeContainer}>
                <TouchableNativeFeedback onPress={() => dispatch(editItem(item, 0))}>
                    <View style={{ flex: 1 }}>
                        <Ionicons style={styles.removeButton} name='md-trash' color={Colors.DANGER} size={scaleY(Fonts.LARGE)} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.SECONDARY,
        marginHorizontal: scaleX(Sizes.MEDIUM),
        marginVertical: scaleY(Sizes.SMALL),
        borderRadius: scaleY(Sizes.SMALL),
        overflow: 'hidden',
        elevation: 5
    },
    img: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
        marginVertical: scaleY(Sizes.SMALL)
    },
    title: {
        flex: 3,
        fontSize: scaleY(Fonts.SMALL),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: Colors.NORMAL
    },
    price: {
        flex: 2,
        fontSize: scaleY(Fonts.SMALL),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: Colors.NORMAL
    },
    removeContainer: {
        flex: 1,
        elevation: 5,
        backgroundColor: Colors.SECONDARY
    },
    removeButton: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})