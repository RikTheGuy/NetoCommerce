import {
    CART_ADD_ITEM,
    CART_EDIT_ITEM,
    CART_RESET_ADDRESS,
    CART_SET_ADDRESS,

} from '../constants/CartConstants.js'

export const addItem = (item, quantity) => async (dispatch) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            ...item,
            quantity: quantity
        }
    })
}

export const editItem = (item, quantity) => async (dispatch) => {
    dispatch({
        type: CART_EDIT_ITEM,
        payload: {
            ...item,
            quantity: quantity
        }
    })
}

export const setAddress = (shippingAdress) => async (dispatch) => {
    dispatch({
        type: CART_SET_ADDRESS,
        payload: shippingAdress
    })
}

export const resetAddress = () => async(dispatch) => {
    dispatch({
        type: CART_RESET_ADDRESS
    })
}