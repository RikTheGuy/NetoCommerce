import {
    CART_ADD_ITEM,
    CART_EDIT_ITEM,

    CART_SET_ADDRESS,
    CART_RESET_ADDRESS,
} from '../constants/CartConstants.js'

export const CartReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM: {
            const items = state.items
            if (items.find(x => x._id === action.payload._id)) {
                const i = items.findIndex(x => x.title === action.payload.title)
                items[i] = { ...action.payload, quantity: action.payload.quantity }
            } else {
                items.push(action.payload)
            }

            return {
                ...state,
                items: items
            }
        }
        case CART_EDIT_ITEM: {
            let items = state.items
            const id = items.findIndex(x => x._id === action.payload._id)

            if (action.payload.quantity <= 0) {
                items.splice(id, 1)
            } else {
                items[id].quantity = action.payload.quantity
            }

            return {
                ...state,
                items: items
            }
        }
        default: {
            return state
        }
    }
}

export const CartAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_SET_ADDRESS: {
            return {
                ...state,
                address: action.payload.address,
                city: action.payload.city,
                postalCode: action.payload.postalCode,
            }
        }
        case CART_RESET_ADDRESS: {
            return {}
        }
        default: {
            return state
        }
    }
}