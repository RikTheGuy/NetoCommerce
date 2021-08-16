import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button.js'

import { createOrder } from '../../store/actions/OrderActions.js'
import { ORDER_CREATE_RESET } from '../../store/constants/OrderConstants.js'


const PlaceOrderScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const OrderCreateReducer = useSelector(state => state.orderCreate)
    const CartReducer = useSelector(state => state.cart)
    const CartAddressReducer = useSelector(state => state.cartAddress)

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

    return (
        <View>
            <Text>Place Order Screen</Text>
            <Text>{JSON.stringify(OrderCreateReducer)}</Text>
            <Button title='Proceed' onPress={submit} />
        </View>
    )

}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})