import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CHECK_USER_STATUS_REQUEST,
    CHECK_USER_STATUS_SUCCESS,
    CHECK_USER_STATUS_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from '../constants';

const initialState = {
    isRequesting: false,
    authStatus: 'unknown',
    first_name: '',
    last_name: '',
    token: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case CHECK_USER_STATUS_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case LOGIN_SUCCESS:
        case CHECK_USER_STATUS_SUCCESS:
            const token = (action.payload.status === 'connected') ? action.payload.authResponse.accessToken : '';
            return {
                ...state,
                isRequesting: false,
                authStatus: action.payload.status,
                token: token
            };
        case LOGIN_FAIL:
        case CHECK_USER_STATUS_FAIL:
            return {
                ...state,
                isRequesting: false,
                authStatus: 'unknown',
                token: ''
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                authStatus: 'unknown',
                token: ''
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name
            };
        case GET_USER_FAIL:
            return {
                ...state,
                isRequesting: false,
            };

        default:
            return {
                ...state
            }
    }
}