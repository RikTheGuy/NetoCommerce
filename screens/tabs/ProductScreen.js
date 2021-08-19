import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Picker } from '@react-native-picker/picker'

import { applyFilter, listProducts } from '../../store/actions/ProductActions.js'

import FilterModal from '../../components/FilterModal.js'
import Product from '../../components/Product.js'
import Message from '../../components/Message.js'
import FAB from '../../components/FloatingActionButton.js'

import Colors from '../../constants/Colors.js'
import { PRODUCT_LIST_RESET, PRODUCT_PAGE_LENGTH } from '../../store/constants/ProductConstants.js'
import Fonts from '../../constants/Fonts.js'
import { GroupH as Group, Label, Range, Toggle } from '../../components/Form.js'

import { scaleY } from '../../utils/Scale.js'

const ProductScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const productListReducer = useSelector(state => state.productList)
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [veg, setVeg] = useState(productListReducer.filters.veg)
    const [nonVeg, setNonVeg] = useState(productListReducer.filters.nonVeg)
    const [minPrice, setMinPrice] = useState(productListReducer.filters.minPrice)
    const [maxPrice, setMaxPrice] = useState(productListReducer.filters.maxPrice)
    const [minRating, setMinRating] = useState(productListReducer.filters.minRating)
    const [maxRating, setMaxRating] = useState(productListReducer.filters.maxRating)

    const initialLoad = () => {
        setPage(0)
        dispatch({ type: PRODUCT_LIST_RESET })
        dispatch(listProducts())
    }

    const dismissFilters = () => {
        setVeg(productListReducer.filters.veg)
        setNonVeg(productListReducer.filters.nonVeg)
        setMinPrice(productListReducer.filters.minPrice)
        setMaxPrice(productListReducer.filters.maxPrice)
        setMinRating(productListReducer.filters.minRating)
        setMaxRating(productListReducer.filters.maxRating)
    }

    const resetFilters = () => {
        dispatch(applyFilter())
        dismissFilters()
        setModalVisible(false)
    }

    const saveFilters = () => {
        const _minPrice = parseInt(minPrice)
        let _maxPrice = parseInt(maxPrice)
        if (_maxPrice < _minPrice) {
            _maxPrice = _minPrice + 1
            setMaxPrice(_minPrice + 1)
        }
        const filters = {
            veg, nonVeg,
            minPrice: _minPrice,
            maxPrice: _maxPrice,
            minRating: parseInt(minRating),
            maxRating: parseInt(maxRating)
        }
        dispatch(applyFilter(filters))
        setModalVisible(false)
    }

    const loadMore = () => {
        if (productListReducer.products && productListReducer.products.length % PRODUCT_PAGE_LENGTH === 0) {
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
            <FilterModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onDismiss={dismissFilters}
                onSubmit={saveFilters}
                onClear={resetFilters}
                title='Filters'>
                <Group>
                    <Label style={styles.label}>Veg</Label>
                    <Toggle value={veg} onValueChange={setVeg} />
                </Group>
                <Group>
                    <Label style={styles.label}>Non-Veg</Label>
                    <Toggle value={nonVeg} onValueChange={setNonVeg} />
                </Group>
                <Group>
                    <Label style={styles.label}>Price</Label>
                    <Range min={minPrice} setMin={setMinPrice} max={maxPrice} setMax={setMaxPrice} />
                </Group>
                <Group>
                    <Label style={styles.label}>Rating</Label>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <Picker style={styles.dropdown} selectedValue={minRating} onValueChange={(itemValue, itemIndex) => setMinRating(itemValue)}>
                            <Picker.Item label='1' value={1} />
                            <Picker.Item label='2' value={2} />
                            <Picker.Item label='3' value={3} />
                            <Picker.Item label='4' value={4} />
                            <Picker.Item label='5' value={5} />
                        </Picker>
                        <Text style={{ flex: 0.3, fontSize: scaleY(Fonts.SMALL), color: Colors.NORMAL }}>to</Text>
                        <Picker style={styles.dropdown} selectedValue={maxRating} onValueChange={(itemValue, itemIndex) => setMaxRating(itemValue)}>
                            <Picker.Item label='1' value={1} />
                            <Picker.Item label='2' value={2} />
                            <Picker.Item label='3' value={3} />
                            <Picker.Item label='4' value={4} />
                            <Picker.Item label='5' value={5} />
                        </Picker>
                    </View>
                </Group>
            </FilterModal>
            {(productListReducer.products && productListReducer.products.length > 0) ?
                <FlatList
                    data={productListReducer.filteredProducts}
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
            <FAB fontSize={Fonts.LARGE} iconName='md-filter' onPress={() => setModalVisible(true)} />
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
    },
    label: {
        flex: 1,
        textAlignVertical: 'center'
    },
    dropdown: {
        flex: 1,
        textAlignVertical: 'center',
        color: Colors.NORMAL,
        fontSize: scaleY(Fonts.SMALL)
    }
})