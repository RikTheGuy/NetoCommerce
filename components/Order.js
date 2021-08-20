import React from 'react'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Sizes from '../constants/Sizes'
import { BASE_URI } from '../constants/URL'
import { scaleX, scaleY } from '../utils/Scale'

import image from '../images/product_image.jpg'

const CartItem = ({ item, onPress }) => {

    return (
        <View style={styles.screen}>
            <View style={styles.main}>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Text style={styles.title}><Text style={{ fontWeight: 'bold' }}>Order Id: </Text>{item._id}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.dates}>
                                <Text style={{ ...styles.delivered }}>{item.createdAt.slice(0, 10)}</Text>
                                <Text style={{ ...styles.delivered, textAlign: 'right', color: item.isDelivered ? Colors.PRIMARY : Colors.DANGER }}>{item.isDelivered ? 'Delivered' : 'Arriving'}</Text>
                            </View>
                            <Text style={styles.address}>{item.shippingAddress.address}</Text>
                            <Text style={styles.city}>
                                {item.shippingAddress.city} - {item.shippingAddress.postalCode}
                            </Text>
                            <View style={styles.items}>
                                {
                                    item.items.slice(0, 5).map(x => (
                                        <Image key={x._id} source={{ uri: BASE_URI + 'images/' + x.image }} defaultSource={image} style={styles.image} />
                                    ))
                                }
                            </View>
                            <Text style={styles.price}>Total: {item.totalPrice}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default CartItem

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
    header: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: scaleY(Sizes.SMALL),
        paddingHorizontal: scaleX(Sizes.MEDIUM),
    },
    title: {
        fontSize: scaleY(Fonts.SMALL),
        textAlignVertical: 'center',
        color: Colors.SECONDARY,
    },
    body: {
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.MEDIUM)
    },
    dates: {
        flex: 1,
        flexDirection: 'row',
    },
    delivered: {
        flex: 1,
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.SMALL)
    },
    address: {
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.SMALL),
    },
    city: {
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.MEDIUM),
    },
    items: {
        flex: 1,
        flexDirection: 'row',
        marginTop: scaleY(Sizes.MEDIUM)
    },
    image: {
        width: scaleX(30),
        height: scaleX(30),
        resizeMode: 'contain',
        marginRight: scaleX(Sizes.SMALL)
    },
    price: {
        fontSize: scaleY(Fonts.MEDIUM),
        textAlignVertical: 'center',
        textAlign: 'right',
        color: Colors.NORMAL
    },
})