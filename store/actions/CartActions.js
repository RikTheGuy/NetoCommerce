import {
    CART_ADD_ITEM,
    CART_EDIT_ITEM
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