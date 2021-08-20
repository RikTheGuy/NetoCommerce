import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button.js'
import Message from '../../components/Message.js'

import { AUTH_LOGOUT_SUCCESS } from '../../store/constants/AuthConstants'
import { scaleX, scaleY } from '../../utils/Scale'

import image from '../../images/profile.jpg'
import Sizes from '../../constants/Sizes.js'
import Fonts from '../../constants/Fonts.js'
import Colors from '../../constants/Colors.js'

import { getProfile } from '../../store/actions/AuthActions.js'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const LoginReducer = useSelector(state => state.authLogin)
    const ProfileReducer = useSelector(state => state.authProfile)

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    useEffect(() => {
        if (!LoginReducer.data || (LoginReducer.data && !LoginReducer.data._id)) {
            navigation.replace('Login')
        }
    }, [navigation, LoginReducer])

    return (
        <View style={styles.screen}>
            {
                ProfileReducer.loading ?
                    <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                    ProfileReducer.error != null ? <Message danger message={ProfileReducer.error} /> :
                        <ScrollView>
                            <Image source={image} style={styles.image} />
                            <View style={styles.profile}>
                                <Text style={styles.title}>
                                    <Text style={{ fontWeight: 'bold' }}>Name: </Text>{ProfileReducer.data.name}</Text>
                                <Text style={{ ...styles.title, fontSize: scaleY(Fonts.MEDIUM) }}>
                                    <Text style={{ fontWeight: 'bold' }}>Email: </Text>{ProfileReducer.data.email}</Text>
                            </View>
                            <View style={styles.buttons}>
                                <Button style={styles.button} centered title='My Orders' onPress={() => navigation.push('Orders')} />
                                <Button style={styles.button} centered title='Terms Of Usage' onPress={() => navigation.push('Orders')} />
                                <Button style={styles.button} centered title='Logout' onPress={() => dispatch({ type: AUTH_LOGOUT_SUCCESS })} />
                            </View>
                        </ScrollView>
            }
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    image: {
        width: '100%',
        resizeMode: 'contain'
    },
    profile: {
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.LARGE)
    },
    title: {
        fontSize: scaleY(Fonts.LARGE),
        color: Colors.NORMAL
    },
    buttons: {
        paddingHorizontal: scaleX(Sizes.MEDIUM)
    },
    button: {
        marginVertical: scaleY(Sizes.SMALL)
    }
})