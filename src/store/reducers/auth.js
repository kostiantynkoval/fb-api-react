import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CHECK_USER_STATUS_REQUEST,
    CHECK_USER_STATUS_SUCCESS,
    CHECK_USER_STATUS_FAIL
} from '../constants';

const initialState = {
    isRequesting: false,
    authStatus: 'unknown',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case CHECK_USER_STATUS_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case LOGIN_SUCCESS:
        case CHECK_USER_STATUS_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                authStatus: action.payload,
            };
        case LOGIN_FAIL:
        case CHECK_USER_STATUS_FAIL:
            return {
                ...state,
                isRequesting: false,
                authStatus: 'unknown',
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                authStatus: 'unknown',
            };
        case LOGOUT_FAIL:
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