import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_RESET,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAILURE,
    PRODUCT_DETAIL_SUCCESS,
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
                ...state,
                loading: false,
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

export const ProductDetailReducer = (state = { product: { nutrients: {} } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST: {
            return {
                loading: true,
                product: { nutrients: {} }
            }
        }
        case PRODUCT_DETAIL_SUCCESS: {
            return {
                loading: false,
                product: action.payload
            }
        }
        case PRODUCT_DETAIL_FAILURE: {
            return {
                loading: false,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}