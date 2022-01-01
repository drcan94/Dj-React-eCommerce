import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PROFILE_DETAIL_REQUEST,
    USER_PROFILE_DETAIL_SUCCESS,
    USER_PROFILE_DETAIL_FAIL,
    USER_PROFILE_DETAIL_RESET,

    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,
} from '../constants/userConstants'


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }


        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userProfileDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_DETAIL_REQUEST:
            return { ...state, loading: true }

        case USER_PROFILE_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_PROFILE_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        case USER_PROFILE_DETAIL_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const userProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }

        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload }

        case USER_PROFILE_UPDATE_RESET:
            return {}


        default:
            return state
    }
}
