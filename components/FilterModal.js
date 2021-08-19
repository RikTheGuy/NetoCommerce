import React from 'react'
import { StyleSheet, View, Modal, Text, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Button from './Button.js'

import Colors from '../constants/Colors.js'
import Sizes from '../constants/Sizes.js'
import Fonts from '../constants/Fonts.js'

import { scaleX, scaleY } from '../utils/Scale.js'

export default FilterModal = ({ modalVisible, setModalVisible, title, children, onSubmit, onClear, onDismiss }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
            statusBarTranslucent={true}
            onDismiss={onDismiss}
            visible={modalVisible}>
            <View style={styles.screen}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <TouchableNativeFeedback onPress={() => setModalVisible(false)}>
                            <View><Ionicons name='md-close' color={Colors.DANGER} size={scaleY(Fonts.MEDIUM)} /></View>
                        </TouchableNativeFeedback>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.body}>
                        {children}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: scaleY(Sizes.MEDIUM) }}>
                        <Button style={{ flex: 1, marginRight: 2 }} title='Clear' onPress={onClear} centered />
                        <Button style={{ flex: 1, marginLeft: 2 }} title='Apply' onPress={onSubmit} centered />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0030105f'
    },
    modal: {
        backgroundColor: Colors.SECONDARY,
        paddingHorizontal: scaleX(Sizes.MEDIUM),
        paddingVertical: scaleY(Sizes.MEDIUM),
        borderRadius: scaleY(Sizes.MEDIUM),
        width: '90%'
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: scaleY(Sizes.MEDIUM)
    },
    body: {
        paddingHorizontal: scaleX(Sizes.MEDIUM)
    },
    title: {
        color: Colors.PRIMARY,
        fontSize: scaleY(Fonts.LARGE),
        marginVertical: scaleY(Sizes.SMALL)
    }
})