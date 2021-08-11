import React from 'react'
import { View, Text } from 'react-native'

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text onPress={() => navigation.push('Tabs')}>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen