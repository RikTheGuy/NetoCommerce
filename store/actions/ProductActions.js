import axios from 'axios'
import { BASE_URI } from '../../constants/URL.js'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
} from '../constants/ProductConstants.js'

export const listProducts = (page = 0) => async (dispatch) => {
    try {

        const limit = 8

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