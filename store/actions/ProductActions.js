import axios from 'axios'
import { BASE_URI } from '../../constants/URL.js'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILURE,
    PRODUCT_PAGE_LENGTH,
} from '../constants/ProductConstants.js'

export const listProducts = (page = 0) => async (dispatch) => {
    try {

        const limit = PRODUCT_PAGE_LENGTH

        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + `products/?limit=${limit}&skip=${page}`,
            headers: {
                'Content': 'application/json'
            }
        })

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios({
            method: 'GET',
            url: BASE_URI + `products/${id}`,
            headers: {
                'Content': 'application/json'
            }
        })

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}