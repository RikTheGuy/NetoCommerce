import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Sizes from '../constants/Sizes'
import { BASE_URI } from '../constants/URL.js'
import { scaleX, scaleY } from '../utils/Scale'
import { Picker } from '@react-native-picker/picker'

import { Ionicons } from '@expo/vector-icons'
import image from '../images/product_image.jpg'

import { editItem } from '../store/actions/CartActions.js'

const CartItem = ({ item, review = false }) => {

    const [qty, setQty] = React.useState(parseInt(item.quantity))
    const dispatch = useDispatch()

    const changeQty = (val) => {
        setQty(val)
        dispatch(editItem(item, val))
    }

    return (
        <View style={styles.screen}>
            <Image source={{ uri: BASE_URI + 'images/' + item.image }} defaultSource={image} style={styles.img} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} X</Text>
            {
                review ?
                    <Text style={{ ...styles.qty, flex: 1 }}>{qty}</Text> :
                    <Picker style={styles.qty} selectedValue={qty}
                        onValueChange={(itemValue, itemIndex) => changeQty(itemValue)}>
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                        <Picker.Item label='7' value={7} />
                        <Picker.Item label='8' value={8} />
                        <Picker.Item label='9' value={9} />
                        <Picker.Item label='10' value={10} />
                    </Picker>
            }
            {
                !review &&
                <View style={styles.removeContainer}>
                    <TouchableNativeFeedback onPress={() => dispatch(editItem(item, 0))}>
                        <View style={{ flex: 1 }}>
                            <Ionicons style={styles.removeButton} name='md-trash' color={Colors.DANGER} size={scaleY(Fonts.LARGE)} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            }
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
    qty: {
        flex: 2.3,
        textAlignVertical: 'center',
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.SMALL)
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