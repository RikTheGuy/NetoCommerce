import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { listProducts } from '../../store/actions/ProductActions.js'

import Product from '../../components/Product.js'
import Message from '../../components/Message.js'
import FAB from '../../components/FloatingActionButton.js'

import Colors from '../../constants/Colors.js'
import { PRODUCT_LIST_RESET } from '../../store/constants/ProductConstants.js'
import Fonts from '../../constants/Fonts.js'

const ProductScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const productListReducer = useSelector(state => state.productList)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)

    const initialLoad = () => {
        setPage(0)
        dispatch({ type: PRODUCT_LIST_RESET })
        dispatch(listProducts())
    }

    const loadMore = () => {
        if (productListReducer.products && productListReducer.products.length % 8 === 0) {
            setRefreshing(true)
            dispatch(listProducts(page + 1))
            setPage(page + 1)
        }
    }

    useEffect(() => {
        initialLoad()
    }, [])

    useEffect(() => {
        if (!productListReducer.loading)
            setRefreshing(false)
    }, [productListReducer])

    return (
        <View style={styles.screen}>
            {(productListReducer.products && productListReducer.products.length > 0) ?
                <FlatList
                    data={productListReducer.products}
                    keyExtractor={item => item._id}
                    renderItem={item => <Product product={item.item} onPress={() => navigation.push('Detail', { id: item.item._id })} />}
                    horizontal={false}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMore}
                    refreshControl={<RefreshControl
                        colors={[Colors.PRIMARY, Colors.HINT]}
                        refreshing={refreshing}
                        onRefresh={() => { setRefreshing(true); initialLoad(); }}
                    />}

                /> : productListReducer.loading ?
                    <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                    <Message message='Nothing To Show' style={{ textAlign: 'center' }} />
            }
            {
                productListReducer.error != null &&
                <Message message={productListReducer.error} style={{ textAlign: 'center' }} danger />
            }
            <FAB fontSize={Fonts.LARGE} iconName='md-filter' onPress={() => console.log('Filter')} />
        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND
    }
})