import React from 'react'
import { View, Text } from 'react-native'
import Fonts from '../../constants/Fonts.js'

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: Fonts.XLARGE }} onPress={() => navigation.replace('Tabs')}>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen