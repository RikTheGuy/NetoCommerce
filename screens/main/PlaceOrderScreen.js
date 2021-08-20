import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button.js'
import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'
import Sizes from '../../constants/Sizes.js'

import CartItem from '../../components/CartItem.js'
import { RadioButton } from '../../components/Form.js'

import { getProfile } from '../../store/actions/AuthActions.js'
import { createOrder } from '../../store/actions/OrderActions.js'
import { ORDER_CREATE_RESET } from '../../store/constants/OrderConstants.js'
import { scaleX, scaleY } from '../../utils/Scale.js'

const PlaceOrderScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const OrderCreateReducer = useSelector(state => state.orderCreate)
    const CartReducer = useSelector(state => state.cart)
    const CartAddressReducer = useSelector(state => state.cartAddress)
    const LoginReducer = useSelector(state => state.authLogin)
    const ProfileReducer = useSelector(state => state.authProfile)

    const submit = () => {
        const order = {
            items: CartReducer.items,
            shippingAddress: CartAddressReducer
        }

        dispatch(createOrder(order))
    }

    useEffect(() => {
        let id
        if (!OrderCreateReducer.loading && !OrderCreateReducer.error && OrderCreateReducer.order) {
            id = OrderCreateReducer.order
            dispatch({ type: ORDER_CREATE_RESET })
            navigation.replace('OrderDetail', { id: id })
        }
    }, [OrderCreateReducer])

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.popToTop()
        }
    }, [navigation, LoginReducer])

    return (
        <View style={styles.screen}>
            {ProfileReducer.loading ?
                <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                ProfileReducer.error != null ? <Message danger message={ProfileReducer.error} /> :
                    <ScrollView>
                        <View style={styles.group}>
                            <Text style={{ fontSize: scaleY(Fonts.LARGE), color: Colors.NORMAL }}>Order Summary</Text>
                        </View>
                        <View style={styles.group}>
                            <Text style={styles.title}>Shipping Address</Text>
                            <View style={styles.body}>
                                <Text style={styles.item}>{ProfileReducer.data.name}</Text>
                                <Text style={styles.item}>{ProfileReducer.data.email}</Text>
                                <Text style={styles.item}>{CartAddressReducer.address}</Text>
                                <Text style={{ ...styles.item, fontSize: scaleY(Fonts.MEDIUM) }}>{CartAddressReducer.city} - {CartAddressReducer.postalCode}</Text>
                            </View>
                        </View>
                        <View style={styles.group}>
                            <Text style={styles.title}>Payment Method</Text>
                            <View style={styles.body}>
                                <RadioButton selected title='Cash On Delivery' />
                            </View>
                        </View>
                        <View style={styles.group}>
                            <Text style={styles.title}>Order Items</Text>
                            <View style={styles.items}>
                                <View>
                                    {
                                        CartReducer.items.map(item => (
                                            <CartItem key={item._id} item={item} review={true} />
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.group, flexDirection: 'row-reverse' }}>
                            <View style={styles.body}>
                                <Text style={styles.title}>Total Price: {CartReducer.items.reduce((acc, value) => acc + value.price * value.quantity, 0)}</Text>
                            </View>
                        </View>
                        <Button title='Place Order' onPress={submit} centered />
                    </ScrollView>
            }
        </View>
    )

}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.SECONDARY,
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.MEDIUM)
    },
    title: {
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.MEDIUM),
        marginBottom: scaleY(Sizes.SMALL)
    },
    group: {
        marginVertical: scaleY(Sizes.SMALL)
    },
    body: {
        marginHorizontal: scaleX(Sizes.MEDIUM)
    },
    item: {
        color: Colors.PRIMARY,
        fontSize: scaleY(Fonts.SMALL)
    },
    items: {
        minHeight: scaleY(300)
    }
})