import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message.js';
import Button from '../../components/Button.js';
import { InputField } from '../../components/Form.js';

import { getProduct } from '../../store/actions/ProductActions.js'
import { addItem } from '../../store/actions/CartActions.js'
import { scaleX, scaleY } from '../../utils/Scale.js';
import image from '../../images/product_image.jpg'

import Colors from '../../constants/Colors.js';
import Fonts from '../../constants/Fonts.js';
import Sizes from '../../constants/Sizes.js';

const DetailScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const productDetailReducer = useSelector(state => state.productDetail)

    const [quantity, setQuantity] = useState(1)
    const { id } = route.params

    useEffect(() => {
        dispatch(getProduct(id))
    }, [id])

    const submit = () => {
        if (quantity == '' || isNaN(quantity) || parseInt(quantity) <= 0)
            return
        const data = {
            _id: productDetailReducer.product._id,
            image: productDetailReducer.product.image,
            title: productDetailReducer.product.title,
            price: productDetailReducer.product.price,
        }

        dispatch(addItem(data, quantity))
        navigation.navigate('Cart')
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                {productDetailReducer.loading ?
                    <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                    productDetailReducer.error != null ? <Message danger message={productDetailReducer.error} /> :
                        <View>
                            <View style={styles.vegIcon}>
                                <Ionicons name='md-ellipse' size={scaleY(Fonts.XLARGE)} color={productDetailReducer.product.veg ? Colors.PRIMARY : Colors.DANGER} />
                                <Text style={{ ...styles.vegText, color: productDetailReducer.product.veg ? Colors.PRIMARY : Colors.DANGER }}>{productDetailReducer.product.veg ? 'Veg' : 'Non Veg'}</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image source={image} style={styles.image} />
                            </View>
                            <View style={styles.container}>
                                <View style={styles.field}>
                                    <Text style={styles.title}>Title: </Text>
                                    <Text style={styles.data}>{productDetailReducer.product.title}</Text>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.title}>Price: </Text>
                                    <Text style={styles.data}>{productDetailReducer.product.price}</Text>
                                </View>
                                <View style={{ ...styles.field, flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text style={styles.title}>Description: </Text>
                                    <Text style={{ ...styles.data, paddingLeft: scaleX(Sizes.LARGE) }}>{productDetailReducer.product.description}</Text>
                                </View>
                                <View style={styles.table}>
                                    <View style={styles.row}>
                                        <Text style={{ ...styles.col, fontWeight: 'bold', fontSize: scaleY(Fonts.MEDIUM) }}>Nutrients</Text>
                                        <Text style={{ ...styles.col, fontWeight: 'bold', fontSize: scaleY(Fonts.MEDIUM) }}>Value</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Protein</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.protein}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Calories</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.calories}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Fats</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.fats}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Sugar</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.sugar}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Carbohydrates</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.carbs}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>Cholesterol</Text>
                                        <Text style={styles.col}>{productDetailReducer.product.nutrients.cholesterol}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>}
            </ScrollView>
            <View style={styles.footer}>
                <InputField style={{ flex: 1, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} placeholder='Quantity' keyboardType='decimal-pad' value={quantity.toString()} onChangeText={e => setQuantity(e)} />
                <Button style={{ flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} title='Add To Cart' onPress={submit} centered />
            </View>
        </View>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.BACKGROUND
    },
    imageContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        resizeMode: 'contain'
    },
    container: {
        paddingHorizontal: scaleX(Sizes.LARGE),
    },
    field: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
    },
    title: {
        fontSize: scaleY(Fonts.MEDIUM),
        color: Colors.NORMAL,
        fontWeight: 'bold'
    },
    data: {
        fontSize: scaleY(Fonts.MEDIUM),
        color: Colors.NORMAL,
    },
    vegIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.SMALL),
        backgroundColor: Colors.SECONDARY,
        borderBottomLeftRadius: scaleX(Sizes.SMALL),
        alignItems: 'center',
        elevation: 2,
    },
    vegText: {
        fontSize: scaleY(Fonts.SMALL),
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    table: {
        backgroundColor: Colors.PRIMARY,
        marginTop: scaleY(Sizes.SMALL),
        marginBottom: scaleY(Sizes.LARGE * 3),
        borderWidth: scaleX(1),
        borderColor: Colors.PRIMARY
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        margin: scaleX(1),
        padding: scaleX(Sizes.SMALL),
        textAlign: 'center',
        fontSize: scaleY(Fonts.SMALL),
        color: Colors.NORMAL,
        backgroundColor: Colors.BACKGROUND
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        elevation: 5,
        bottom: 0,
        backgroundColor: Colors.SECONDARY,
        paddingVertical: scaleY(Sizes.SMALL),
        paddingHorizontal: scaleX(Sizes.LARGE),
        borderTopLeftRadius: scaleX(Sizes.MEDIUM),
        borderTopRightRadius: scaleX(Sizes.MEDIUM),
    }
})