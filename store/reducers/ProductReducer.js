import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_RESET,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAILURE,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_APPLY_FILTER,
    PRODUCT_CLEAR_FILTER,
} from '../constants/ProductConstants.js'

const initialState = {
    products: [],
    filteredProducts: [],
    filters: {
        veg: true,
        nonVeg: true,
        minPrice: 0,
        maxPrice: 10000,
        minRating: 0,
        maxRating: 5
    }
}

export const ProductListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: {
            return {
                loading: true,
                filters: state.filters,
                products: state.products,
                filteredProducts: state.filteredProducts
            }
        }
        case PRODUCT_LIST_SUCCESS: {
            const _products = [...state.products, ...action.payload]
            return {
                loading: false,
                filters: state.filters,
                products: _products,
                filteredProducts: _products.filter(x =>
                    x.veg === ((state.filters.veg === state.filters.nonVeg) ? x.veg : state.filters.veg) &&
                    x.price >= state.filters.minPrice &&
                    x.price <= state.filters.maxPrice &&
                    x.rating >= state.filters.minRating &&
                    x.rating <= state.filters.maxRating
                )
            }
        }
        case PRODUCT_LIST_FAILURE: {
            return {
                ...state,
                loading: false,
                filters: state.filters,
                error: action.payload,
                filteredProducts: state.filteredProducts
            }
        }
        case PRODUCT_APPLY_FILTER: {
            return {
                ...state,
                filters: action.payload,
                filteredProducts: state.products.filter(x =>
                    x.veg === ((action.payload.veg === action.payload.nonVeg) ? x.veg : action.payload.veg) &&
                    x.price >= action.payload.minPrice &&
                    x.price <= action.payload.maxPrice &&
                    x.rating >= action.payload.minRating &&
                    x.rating <= action.payload.maxRating
                )
            }
        }
        case PRODUCT_CLEAR_FILTER: {
            return {
                ...state,
                filters: initialState.filters,
                filteredProducts: state.products
            }
        }
        case PRODUCT_LIST_RESET: {
            return initialState
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