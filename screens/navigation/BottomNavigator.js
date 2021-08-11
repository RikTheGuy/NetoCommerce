import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProductScreen from '../tabs/ProductScreen.js'
import CartScreen from '../tabs/CartScreen.js'
import ProfileScreen from '../tabs/ProfileScreen.js'

const Tabs = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen name='Products' component={ProductScreen} />
            <Tabs.Screen name='Cart' component={CartScreen} />
            <Tabs.Screen name='Profile' component={ProfileScreen} />
        </Tabs.Navigator>
    )
}

export default BottomNavigator