import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DetailScreen from '../main/DetailScreen.js'
import BottomNavigator from './BottomNavigator.js'

import Colors from '../../constants/Colors.js'

const Navigator = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator.Navigator
                initialRouteName='Tabs'
                screenOptions={{
                    headerTintColor: Colors.PRIMARY,
                    title: 'NetoCommerce',
                }}>
                <Navigator.Screen name='Tabs' component={BottomNavigator} />
                <Navigator.Screen name='Detail' component={DetailScreen} />
            </Navigator.Navigator>
            <StatusBar />
        </NavigationContainer>
    )
}

export default MainNavigator