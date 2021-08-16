import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ShippingScreen from '../main/ShippingScreen.js'
import PlaceOrderScreen from '../main/PlaceOrderScreen.js'

const Navigator = createNativeStackNavigator()

const CheckoutNavigator = () => {
    return (
        <Navigator.Navigator
            initialRouteName='Shipping'
            screenOptions={{
                headerShown: false,
            }}>
            <Navigator.Screen name='Shipping' component={ShippingScreen} />
            <Navigator.Screen name='PlaceOrder' component={PlaceOrderScreen} />
        </Navigator.Navigator>
    )
}

export default CheckoutNavigator