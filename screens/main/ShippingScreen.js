import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { InputField, Label, Group, Title } from '../../components/Form.js'
import Button from '../../components/Button.js'
import Message from '../../components/Message.js'

import { scaleX, scaleY } from '../../utils/Scale.js'

import Sizes from '../../constants/Sizes.js'
import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'

import { setAddress as saveAddress } from '../../store/actions/CartActions.js'

const ShippingScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const ShippingReducer = useSelector(state => state.cartAddress)
    const LoginReducer = useSelector(state => state.authLogin)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [message, setMessage] = useState('')

    const submit = () => {
        setMessage('')

        if (address.length <= 0 || city.length <= 0 || postalCode.length <= 0) {
            setMessage('All Fields Are Mandatory')
            return
        }

        dispatch(saveAddress({ address, city, postalCode }))
        navigation.replace('PlaceOrder')
    }

    useEffect(() => {
        setAddress(ShippingReducer.address ? ShippingReducer.address : '')
        setCity(ShippingReducer.city ? ShippingReducer.city : '')
        setPostalCode(ShippingReducer.postalCode ? ShippingReducer.postalCode : '')
    }, [])

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.popToTop()
        }
    }, [navigation, LoginReducer])

    return (
        <View style={styles.screen}>
            <View style={styles.main}>
                <ScrollView>
                    <Group>
                        <Title>Shipping Address</Title>
                        {<Message message={message.length > 0 && message} style={{ fontSize: scaleY(Fonts.SMALL) }} danger />}
                    </Group>
                    <Group>
                        <Label>Address:</Label>
                        <InputField placeholder='Ex: B2 Dragon Apartment' value={address} onChangeText={setAddress} />
                    </Group>
                    <Group>
                        <Label>City:</Label>
                        <InputField placeholder='City Name' value={city} onChangeText={setCity} />
                    </Group>
                    <Group>
                        <Label>Postal Code:</Label>
                        <InputField placeholder='Ex: 826001' value={postalCode} onChangeText={setPostalCode} />
                    </Group>
                    <View style={styles.submitContainer}>
                        <Button title='Continue' onPress={submit} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ShippingScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND
    },
    main: {
        flexDirection: 'column',
        elevation: 1,
        width: '90%',
        marginHorizontal: scaleX(Sizes.MEDIUM),
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.LARGE),
        borderRadius: scaleX(Sizes.SMALL),
        backgroundColor: Colors.SECONDARY,
    },
    submitContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})