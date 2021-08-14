import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_RESET,

    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_REGISTER_RESET,

    AUTH_LOGOUT_SUCCESS,

} from '../constants/AuthConstants.js'

export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST: {
            return {
                loading: true
            }
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                loading: false,
                data: action.payload
            }
        }
        case AUTH_LOGIN_FAILURE: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case AUTH_LOGIN_RESET: {
            return {
                loading: false
            }
        }
        case AUTH_LOGOUT_SUCCESS: {
            return {}
        }
        default: {
            return state
        }
    }
}

export const RegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_REGISTER_REQUEST: {
            return {
                loading: true,
            }
        }
        case AUTH_REGISTER_SUCCESS: {
            return {
                success: true,
                loading: false
            }
        }
        case AUTH_REGISTER_FAILURE: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case AUTH_REGISTER_RESET: {
            return {}
        }
        default: {
            return state
        }
    }
}