import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'


import Colors from '../constants/Colors.js'
import Fonts from '../constants/Fonts.js'
import Sizes from '../constants/Sizes.js'
import { BASE_URI } from '../constants/URL.js'

import RatingInput from './RatingInput.js'
import { Ionicons } from '@expo/vector-icons'
import image from '../images/product_image.jpg'
import { scaleX, scaleY } from '../utils/Scale.js'

const Product = ({ product, onPress }) => {

    return (
        <View style={styles.screen}>
            <View style={styles.main}>
                <View style={styles.vegContainer}>
                    <View style={styles.veg}>
                        <Ionicons name='md-ellipse' size={Fonts.LARGE} color={product.veg ? Colors.PRIMARY : Colors.DANGER} />
                    </View>
                </View>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.container}>
                        <Image source={{ uri: BASE_URI + 'images/' + product.image }} defaultSource={image} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{product.title}</Text>
                            <RatingInput value={product.rating} editable={false} size={scaleY(Fonts.MEDIUM)} />
                            <Text style={styles.price}><Text style={{ fontWeight: 'bold' }}>Price: </Text>{product.price}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    screen: {
        flex: .5,
        borderWidth: 0,
        margin: 0,
    },
    main: {
        flex: 1,
        marginHorizontal: scaleX(Sizes.SMALL),
        marginVertical: scaleY(Sizes.SMALL),
        borderRadius: scaleX(Sizes.SMALL),
        elevation: 1,
        overflow: 'hidden',
        backgroundColor: Colors.SECONDARY
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.MEDIUM),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: scaleY(180),
        resizeMode: 'contain'
    },
    details: {
        width: '100%'
    },
    title: {
        fontSize: scaleY(Fonts.MEDIUM)
    },
    price: {
        fontSize: scaleY(Fonts.SMALL)
    },
    vegContainer: {
        zIndex: 1,
        borderBottomLeftRadius: Sizes.SMALL,
        position: 'absolute',
        top: 0,
        right: 0,
        elevation: 2,
        overflow: 'hidden'
    },
    veg: {
        paddingHorizontal: scaleX(3),
        paddingVertical: scaleY(3),
        backgroundColor: Colors.SECONDARY
    }
})