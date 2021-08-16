import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { AUTH_LOGOUT_SUCCESS } from '../../store/constants/AuthConstants'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const LoginReducer = useSelector(state => state.authLogin)

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.replace('Login')
        }
    }, [navigation, LoginReducer])

    return (
        <View>
            <Text>ProfileScreen</Text>
            <Text onPress={() => dispatch({ type: AUTH_LOGOUT_SUCCESS })}>Logout</Text>
            <Text onPress={() => navigation.push('Orders')}>My Orders</Text>
        </View>
    )
}

export default ProfileScreen