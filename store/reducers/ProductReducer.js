import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_RESET,
} from '../constants/ProductConstants.js'

export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: {
            return {
                loading: true,
                products: state.products
            }
        }
        case PRODUCT_LIST_SUCCESS: {
            return {
                loading: false,
                products: [...state.products, ...action.payload]
            }
        }
        case PRODUCT_LIST_FAILURE: {
            return {
                loading: false,
                products: state.products,
                error: action.payload
            }
        }
        case PRODUCT_LIST_RESET: {
            return {
                products: []
            }
        }
        default: {
            return state
        }
    }
}