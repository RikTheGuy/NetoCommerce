import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import Message from '../../components/Message.js'
import Button from '../../components/Button.js'
import CartItem from '../../components/CartItem.js'

import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'

import { scaleY, scaleX } from '../../utils/Scale.js'
import Sizes from '../../constants/Sizes.js'

import { Ionicons } from '@expo/vector-icons'

const CartScreen = ({ navigation }) => {

    const CartReducer = useSelector(state => state.cart)

    const submit = () => {
        CartReducer.items && CartReducer.items.length > 0 &&
            navigation.navigate('Auth', { redirect: 'Checkout' })
    }

    return (
        <View style={styles.screen}>
            {CartReducer.items && CartReducer.items.length > 0 ?
                <View style={styles.screen}>
                    <FlatList
                        data={CartReducer.items}
                        renderItem={item => <CartItem item={item.item} />}
                        keyExtractor={item => item._id}
                        horizontal={false}
                    />
                    <View style={styles.footer}>
                        <Button style={{ flex: 1 }} onPress={submit}>
                            <View style={styles.checkout}>
                                <View>
                                    <Text style={styles.checkoutText}>{CartReducer.items.length} Items</Text>
                                    <Text style={styles.checkoutText}>200 (plus Taxes)</Text>
                                </View>
                                <Text style={styles.checkoutText}>Checkout <Ionicons name='arrow-forward' size={scaleY(Fonts.MEDIUM)} /></Text>
                            </View>
                        </Button>
                    </View>
                </View>
                :
                <Message message='Nothing To Show' style={{ textAlign: 'center', color: Colors.HINT }} />
            }
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND
    },
    footer: {
        elevation: 5,
        flexDirection: 'row',
        position: 'relative',
        bottom: scaleY(Sizes.SMALL),
        marginHorizontal: scaleX(Sizes.SMALL),
        borderTopLeftRadius: scaleX(Sizes.MEDIUM),
        borderTopRightRadius: scaleX(Sizes.MEDIUM),
    },
    checkout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkoutText: {
        color: Colors.SECONDARY,
        textAlignVertical: 'center',
        fontSize: scaleY(Fonts.SMALL)
    }
})