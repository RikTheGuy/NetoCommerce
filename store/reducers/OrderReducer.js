import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAILURE,
    
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    
    ORDER_LIST_RESET,
} from '../constants/OrderConstants.js'

export const OrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST: {
            return {
                loading: true,
                orders: state.orders
            }
        }
        case ORDER_LIST_SUCCESS: {
            return {
                loading: false,
                orders: [...state.orders, ...action.payload]
            }
        }
        case ORDER_LIST_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case ORDER_LIST_RESET: {
            return {
                orders: []
            }
        }
        default: {
            return state
        }
    }
}

export const OrderDetailReducer = (state = { order: { items: [] } }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST: {
            return {
                loading: true,
                order: { items: [] }
            }
        }
        case ORDER_DETAIL_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case ORDER_DETAIL_FAILURE: {
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

export const OrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST: {
            return {
                loading: true,
            }
        }
        case ORDER_CREATE_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case ORDER_CREATE_FAILURE: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case ORDER_CREATE_RESET:{
            return{}
        }
        default: {
            return state
        }
    }
}