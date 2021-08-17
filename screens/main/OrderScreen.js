import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { listOrders } from '../../store/actions/OrderActions.js'

import Message from '../../components/Message.js'
import FAB from '../../components/FloatingActionButton.js'
import Order from '../../components/Order.js'

import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'
import { ORDER_LIST_RESET, ORDER_PAGE_LENGTH } from '../../store/constants/OrderConstants.js'

const OrderScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const orderListReducer = useSelector(state => state.orderList)
    const LoginReducer = useSelector(state => state.authLogin)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const initialLoad = () => {
        setPage(0)
        dispatch({ type: ORDER_LIST_RESET })
        dispatch(listOrders())
    }

    const loadMore = () => {
        if (orderListReducer.orders && orderListReducer.orders.length % 8 === ORDER_PAGE_LENGTH) {
            setRefreshing(true)
            dispatch(listOrders(page + 1))
            setPage(page + 1)
        }
    }

    useEffect(() => {
        initialLoad()
    }, [])

    useEffect(() => {
        if (!orderListReducer.loading)
            setRefreshing(false)
    }, [orderListReducer])

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.popToTop()
        }
    }, [navigation, LoginReducer])

    return (
        <View style={styles.screen}>
            {(orderListReducer.orders && orderListReducer.orders.length > 0) ?
                <FlatList
                    data={orderListReducer.orders}
                    keyExtractor={item => item._id}
                    renderItem={item => <Order item={item.item} onPress={() => navigation.push('OrderDetail', { id: item.item._id })} />}
                    horizontal={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMore}
                    refreshControl={<RefreshControl
                        colors={[Colors.PRIMARY, Colors.HINT]}
                        refreshing={refreshing}
                        onRefresh={() => { setRefreshing(true); initialLoad(); }}
                    />}

                /> : orderListReducer.loading ?
                    <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                    <Message message='Nothing To Show' style={{ textAlign: 'center' }} />
            }
            {
                orderListReducer.error != null &&
                <Message message={orderListReducer.error} style={{ textAlign: 'center' }} danger />
            }
            <FAB fontSize={Fonts.LARGE} iconName='md-filter' onPress={() => console.log('Filter')} />
        </View>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND
    }
})