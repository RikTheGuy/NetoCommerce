import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { InputField, Label, Group, Title } from '../../components/Form.js'
import Button from '../../components/Button.js'
import Message from '../../components/Message.js'

import { scaleX, scaleY } from '../../utils/Scale.js'

import Sizes from '../../constants/Sizes.js'
import Colors from '../../constants/Colors.js'
import Fonts from '../../constants/Fonts.js'

import { login } from '../../store/actions/AuthActions.js'
import { AUTH_LOGIN_RESET } from '../../store/constants/AuthConstants.js'

const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const LoginReducer = useSelector(state => state.authLogin)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const submit = () => {
        dispatch({ type: AUTH_LOGIN_RESET })
        setMessage('')

        if (email.length <= 0 || password.length <= 0) {
            setMessage('All Fields Are Mandatory')
            return
        }

        dispatch(login(email, password))
    }

    useEffect(() => {
        if (!LoginReducer.loading && LoginReducer.data && LoginReducer.data._id) {
            navigation.replace('Profile')
        }
    }, [LoginReducer, navigation])

    return (
        <View style={styles.screen}>
            <View style={styles.main}>
                <ScrollView>
                    <Group>
                        <Title>Login</Title>
                        {
                            LoginReducer.loading ? <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                                <Message message={LoginReducer.error ? LoginReducer.error : message} style={{ fontSize: scaleY(Fonts.SMALL) }} danger />
                        }
                    </Group>
                    <Group>
                        <Label>Email:</Label>
                        <InputField placeholder='Ex: johnsmith@email.com' value={email} onChangeText={setEmail} editable={!LoginReducer.loading} keyboardType='email-address' />
                    </Group>
                    <Group>
                        <Label>Password:</Label>
                        <InputField placeholder='Ex: password' secureTextEntry value={password} onChangeText={setPassword} editable={!LoginReducer.loading} />
                    </Group>
                    <View style={styles.submitContainer}>
                        <Button title='Login' onPress={submit} />
                        <Text style={styles.link} onPress={() => navigation.push('Register')}>New Here? Register Now</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default LoginScreen

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
    link: {
        fontSize: Fonts.MEDIUM,
        color: Colors.PRIMARY,
        borderColor: Colors.PRIMARY,
        borderBottomWidth: scaleY(1)
    }
})