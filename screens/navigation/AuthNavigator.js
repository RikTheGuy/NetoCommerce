import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../auth/LoginScreen.js'
import RegisterScreen from '../auth/RegisterScreen.js'
import ProfileScreen from '../auth/ProfileScreen.js'

const Navigator = createNativeStackNavigator()

const AuthNavigator = ({ navigation, route = null }) => {

    React.useEffect(() => {
        if (route.params && route.params.redirect) {
            navigation.navigate(route.params.redirect)
        }
    }, [route.params])
    return (
        <Navigator.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}>
            <Navigator.Screen name='Login' component={LoginScreen} />
            <Navigator.Screen name='Register' component={RegisterScreen} />
            <Navigator.Screen name='Profile' component={ProfileScreen} />
        </Navigator.Navigator>
    )
}

export default AuthNavigator