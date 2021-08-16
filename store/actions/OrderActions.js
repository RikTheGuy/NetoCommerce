import axios from 'axios'
import { BASE_URI } from '../../constants/URL.js'
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAILURE,
    
    ORDER_PAGE_LENGTH,

    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
} from '../constants/OrderConstants.js'

import { logout } from './AuthActions.js'

export const listOrders = (page = 0) => async (dispatch, getState) => {
    try {

        const limit = ORDER_PAGE_LENGTH
        const { authLogin } = getState()

        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + `orders/?limit=${limit}&skip=${page}`,
            headers: {
                'Content': 'application/json',
                'Authorization': `Bearer ${authLogin.data.tokens.token}`
            }
        })

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response && error.response.status === 401)
            dispatch(logout())
        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        const { authLogin } = getState()

        dispatch({ type: ORDER_DETAIL_REQUEST })
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + `orders/${id}`,
            headers: {
                'Content': 'application/json',
                'Authorization': `Bearer ${authLogin.data.tokens.token}`
            }
        })

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response && error.response.status === 401)
            dispatch(logout())
        dispatch({
            type: ORDER_DETAIL_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        const { authLogin } = getState()

        dispatch({ type: ORDER_CREATE_REQUEST })
        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + `orders/`,
            headers: {
                'Content': 'application/json',
                'Authorization': `Bearer ${authLogin.data.tokens.token}`
            },
            data: order
        })

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data._id
        })

    } catch (error) {
        if (error.response && error.response.status === 401)
            dispatch(logout())
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}