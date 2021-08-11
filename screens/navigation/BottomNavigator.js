import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ProductScreen from '../tabs/ProductScreen.js'
import CartScreen from '../tabs/CartScreen.js'
import ProfileScreen from '../tabs/ProfileScreen.js'

import Colors from '../../constants/Colors.js'

const Tabs = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.SECONDARY,
                tabBarInactiveTintColor: Colors.PRIMARY,
                tabBarShowLabel: true,
                tabBarActiveBackgroundColor: Colors.PRIMARY,
                tabBarInactiveBackgroundColor: Colors.SECONDARY,
            }}>
            <Tabs.Screen name='Products' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-basket' color={color} size={size} /> }} component={ProductScreen} />
            <Tabs.Screen name='Cart' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-cart' color={color} size={size} /> }} component={CartScreen} />
            <Tabs.Screen name='Profile' options={{ tabBarIcon: ({ color, size }) => <Ionicons name='md-person' color={color} size={size} /> }} component={ProfileScreen} />
        </Tabs.Navigator>
    )
}

export default BottomNavigator