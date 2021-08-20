import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'
import Sizes from '../../constants/Sizes.js'
import Message from '../../components/Message.js';
import CartItem from '../../components/CartItem.js'

import { getOrder } from '../../store/actions/OrderActions.js'
import { scaleX, scaleY } from '../../utils/Scale.js'

import { getProfile } from '../../store/actions/AuthActions.js'

const OrderDetailScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const orderDetailReducer = useSelector(state => state.orderDetail)
    const LoginReducer = useSelector(state => state.authLogin)
    const ProfileReducer = useSelector(state => state.authProfile)

    const { id } = route.params

    useEffect(() => {
        dispatch(getOrder(id))
        dispatch(getProfile())
    }, [id])

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.popToTop()
        }
    }, [navigation, LoginReducer])

    return (
        <View style={styles.screen}>
            {orderDetailReducer.loading || ProfileReducer.loading ?
                <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                ProfileReducer.error != null ? <Message danger message={ProfileReducer.error} /> :
                    orderDetailReducer.error != null ? <Message danger message={orderDetailReducer.error} /> :
                        <ScrollView>
                            <View style={styles.group}>
                                <Text style={{ fontSize: scaleY(Fonts.LARGE), color: Colors.NORMAL }}>Order Summary</Text>
                            </View>
                            <View style={styles.group}>
                                <Text style={styles.title}>Shipping Address</Text>
                                <View style={styles.body}>
                                    <Text style={styles.item}>{ProfileReducer.data.name}</Text>
                                    <Text style={styles.item}>{ProfileReducer.data.email}</Text>
                                    <Text style={styles.item}>{orderDetailReducer.order.shippingAddress.address}</Text>
                                    <Text style={{ ...styles.item, fontSize: scaleY(Fonts.MEDIUM) }}>{orderDetailReducer.order.shippingAddress.city} - {orderDetailReducer.order.shippingAddress.postalCode}</Text>
                                </View>
                            </View>
                            <View style={styles.group}>
                                <Text style={styles.title}>Payment Method</Text>
                                <View style={styles.body}>
                                    <Text style={styles.item}>Cash On Delivery</Text>
                                </View>
                            </View>
                            <View style={styles.group}>
                                <Text style={styles.title}>Order Status</Text>
                                <View style={styles.body}>
                                    <Text style={styles.item}><Text style={{ ...styles.item, fontWeight: 'bold' }}>Ordered At: </Text>{orderDetailReducer.order.createdAt != null && orderDetailReducer.order.createdAt.slice(0, 10)}</Text>
                                    <Text style={{ ...styles.item, color: orderDetailReducer.order.isPaid ? Colors.PRIMARY : Colors.DANGER }}>{orderDetailReducer.order.isPaid ? 'Paid On: ' + orderDetailReducer.order.paidAt : 'Not Paid'}</Text>
                                    {
                                        orderDetailReducer.order.isCancelled ?
                                            <Text style={{ ...styles.item, color: Colors.DANGER }}>{'Cancelled On: ' + orderDetailReducer.order.cancelledAt}</Text> :
                                            <Text style={{ ...styles.item, color: orderDetailReducer.order.isDelivered ? Colors.PRIMARY : Colors.DANGER }}>{orderDetailReducer.order.isDelivered ? 'Delivered On: ' + orderDetailReducer.order.deliveredAt : 'Arriving'}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.group}>
                                <Text style={styles.title}>Order Items</Text>
                                <View style={styles.items}>
                                    <View>
                                        {
                                            orderDetailReducer.order.items.map(item => (
                                                <CartItem key={item._id} item={item} review={true} />
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.group, flexDirection: 'row-reverse' }}>
                                <View style={styles.body}>
                                    <Text style={styles.title}>Total Price: {orderDetailReducer.order.totalPrice}</Text>
                                </View>
                            </View>
                        </ScrollView>}
        </View>
    )
}

export default OrderDetailScreen

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