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

import { register } from '../../store/actions/AuthActions.js'
import { AUTH_REGISTER_RESET } from '../../store/constants/AuthConstants.js'

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const RegisterReducer = useSelector(state => state.authRegister)

    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [message, setMessage] = useState('')

    const submit = () => {
        dispatch({ type: AUTH_REGISTER_RESET })
        setMessage('')

        if (fname.length <= 0 || lname.length <= 0 || email.length <= 0 || password.length <= 0 || rePassword.length <= 0) {
            setMessage('All Fields Are Mandatory')
            return
        } else if (password !== rePassword) {
            setMessage('Passwords Do Not Match')
            return
        }

        const data = {
            firstName: fname,
            lastName: lname,
            email,
            password
        }

        dispatch(register(data))
    }

    useEffect(() => {
        if (!RegisterReducer.loading && !RegisterReducer.error && RegisterReducer.success) {
            dispatch({ type: AUTH_REGISTER_RESET })
            navigation.popToTop()
        }
    }, [dispatch, RegisterReducer])
    return (
        <View style={styles.screen}>
            <View style={styles.main}>
                <ScrollView>
                    <Group>
                        <Title>Register</Title>
                        {
                            RegisterReducer.loading ? <ActivityIndicator size='large' color={Colors.PRIMARY} /> :
                                <Message message={RegisterReducer.error ? RegisterReducer.error : message} style={{ fontSize: scaleY(Fonts.SMALL) }} danger />
                        }
                    </Group>
                    <Group>
                        <Label>First Name:</Label>
                        <InputField placeholder='Ex: John' value={fname} onChangeText={setFName} editable={!RegisterReducer.loading} />
                    </Group>
                    <Group>
                        <Label>Last Name:</Label>
                        <InputField placeholder='Ex: Smith' value={lname} onChangeText={setLName} editable={!RegisterReducer.loading} />
                    </Group>
                    <Group>
                        <Label>Email:</Label>
                        <InputField placeholder='Ex: johnsmith@email.com' value={email} onChangeText={setEmail} editable={!RegisterReducer.loading} keyboardType='email-address'/>
                    </Group>
                    <Group>
                        <Label>Password:</Label>
                        <InputField placeholder='Password' value={password} onChangeText={setPassword} editable={!RegisterReducer.loading} secureTextEntry />
                    </Group>
                    <Group>
                        <Label>Confirm Password:</Label>
                        <InputField placeholder='Re Enter Pasword' value={rePassword} onChangeText={setRePassword} editable={!RegisterReducer.loading} secureTextEntry />
                    </Group>
                    <View style={styles.submitContainer}>
                        <Button title='Register' onPress={submit} />
                        <Text style={styles.link} onPress={() => navigation.pop()}>Already a Member?</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterScreen

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