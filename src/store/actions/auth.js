import {push} from 'react-router-redux';
import {apiRequest, apiSuccess, apiFail} from '../actions/api';

// BASE_URL constant prepared for backend

import {
    BASE_URL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SNACKBAR_SHOW
} from '../constants';


export const loginAction = loginData => dispatch => {
    dispatch(apiRequest(LOGIN_REQUEST));

    setTimeout(() => doLogin(), 500);
    function doLogin() {
        if (loginData.email !== '' && loginData.password !== '') {

            if (localStorage.getItem(loginData.email) === loginData.password) {
                localStorage.setItem('token', '12345');
                dispatch(apiSuccess(LOGIN_SUCCESS, localStorage.getItem('token')));
                dispatch(apiSuccess(SNACKBAR_SHOW, 'Login Successful'));
                dispatch(push('/'));
            } else {
                dispatch(apiFail(LOGIN_FAIL, ''));
                dispatch(apiFail(SNACKBAR_SHOW, 'Login Failed'));
                localStorage.removeItem('token');
            }
        }

    }

}

export const logoutAction = () => dispatch => {
    dispatch(apiRequest(LOGOUT_REQUEST));

    setTimeout(() => doLogout(), 600);

    function doLogout() {
        localStorage.removeItem('token');
        if (!localStorage.getItem('token')) {
            dispatch(apiSuccess(LOGOUT_SUCCESS, ''));
            dispatch(apiSuccess(SNACKBAR_SHOW, 'You Logged out successfully'));
            dispatch(push('/login'));
        } else {
            dispatch(apiFail(LOGOUT_FAIL, ''));
            dispatch(apiFail(SNACKBAR_SHOW, 'Logout Failed'));
        }
    }
}