import axios from 'axios'
import { BASE_URI } from '../../constants/URL.js'
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGOUT_SUCCESS,
} from '../constants/AuthConstants.js'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOGIN_REQUEST })

        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + 'auth/login',
            headers: {
                'Content': 'application/json'
            },
            data: {
                email, password
            }
        })

        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: { _id: data._id, tokens: data.tokens }
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOGIN_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message :
                error.message
        })
    }
}

export const register = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REGISTER_REQUEST })

        const { data } = await axios({
            method: 'POST',
            url: BASE_URI + 'auth/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: credentials
        })

        dispatch({
            type: AUTH_REGISTER_SUCCESS,
        })
        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: { _id: data._id, tokens: data.tokens }
        })
    } catch (error) {
        dispatch({
            type: AUTH_REGISTER_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message :
                error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS })
}

export const updateTokens = (data) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOGIN_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message :
                error.message
        })
    }
}