import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ProductScreen from '../tabs/ProductScreen.js'
import CartScreen from '../tabs/CartScreen.js'
import AuthNavigator from './AuthNavigator.js'

import Colors from '../../constants/Colors.js'

const Tabs = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tabs.Navigator
            initialRouteName='Products'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.HINT,
                tabBarShowLabel: true,
                tabBarActiveBackgroundColor: Colors.SECONDARY,
                tabBarInactiveBackgroundColor: Colors.SECONDARY,
            }}>
            <Tabs.Screen name='Products' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-basket' color={color} size={size} /> }} component={ProductScreen} />
            <Tabs.Screen name='Cart' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-cart' color={color} size={size} /> }} component={CartScreen} />
            <Tabs.Screen name='Auth' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-person' color={color} size={size} /> }} component={AuthNavigator} />
        </Tabs.Navigator>
    )
}

export default BottomNavigator