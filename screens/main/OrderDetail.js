import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message.js';

import { getOrder } from '../../store/actions/OrderActions.js'

import Colors from '../../constants/Colors.js';

const OrderDetailScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const orderDetailReducer = useSelector(state => state.orderDetail)

    const { id } = route.params

    useEffect(() => {
        dispatch(getOrder(id))
    }, [id])

    return (
        <View style={styles.screen}>
            <ScrollView>
                {orderDetailReducer.loading ?
                    <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                    orderDetailReducer.error != null ? <Message danger message={orderDetailReducer.error} /> :
                        <View>
                            <Text>{orderDetailReducer.order._id}</Text>
                        </View>}
            </ScrollView>
        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.BACKGROUND
    },
})