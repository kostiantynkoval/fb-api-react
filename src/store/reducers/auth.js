import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL } from '../constants';

const initialState = {
    isRequesting: false,
    isLoggedIn: false,
    token: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                isLoggedIn: action.payload !== '',
                token: action.payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isRequesting: false,
                isLoggedIn: false,
                token: ''
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                isLoggedIn: false,
                token: ''
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case REGISTER_REQUEST:
            return {
                ...state,
                isRequesting: true,
                isLoggedIn: false,
                token: ''
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRequesting: false,
            };
        case REGISTER_FAIL:
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