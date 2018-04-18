import {push} from 'react-router-redux';
import {apiRequest, apiSuccess, apiFail} from '../actions/api';
import Facebook from '../facebook';
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
    SNACKBAR_SHOW
} from '../constants';


export const checkUserStatusAction = () => dispatch => {
    dispatch(apiRequest(CHECK_USER_STATUS_REQUEST));

    const fbAPI = new Facebook();

    fbAPI.getLoginStatus(function(response){

        if (response && !response.error) {
            dispatch(apiSuccess(CHECK_USER_STATUS_SUCCESS, response));
            dispatch(getUserAction())
        }else {
            dispatch(apiFail(CHECK_USER_STATUS_FAIL));
        }
    });
};

export const getUserAction = () => dispatch => {
    dispatch(apiRequest(GET_USER_REQUEST));

    window.FB.api(
        '/me',
        'GET',
        { fields: 'first_name, last_name'},
        function(response) {
            if (response && !response.error) {
                dispatch(apiSuccess(GET_USER_SUCCESS, response));
            } else {
                dispatch(apiFail(GET_USER_FAIL, response.status));
                console.log('getUser result error:', response);
            }
        }
    );
};

export const loginAction = loginData => dispatch => {
    dispatch(apiRequest(LOGIN_REQUEST));

    window.FB.login(function(response) {
        if (response && !response.error) {
            if (response.status === 'connected') {
                dispatch(apiSuccess(LOGIN_SUCCESS, response));
                dispatch(apiSuccess(SNACKBAR_SHOW, 'Login successfully!'));
                dispatch(push('/photos'));
                window.FB.api('/me/permissions', (response) => {
                    console.log('permissions', response)
                })
            } else {
                dispatch(apiFail(LOGIN_FAIL, response.status));
                dispatch(apiFail(SNACKBAR_SHOW, 'Login failed!'));
                dispatch(push('/login'));
            }

        } else {
            dispatch(apiFail(LOGIN_FAIL, 'unknown'));
            dispatch(apiFail(SNACKBAR_SHOW, 'Login failed!'));
            dispatch(push('/login'));
        }
    }, {scope: 'publish_actions, user_photos, manage_pages, pages_show_list, publish_pages, public_profile, email'});
};

export const logoutAction = () => dispatch => {
    dispatch(apiRequest(LOGOUT_REQUEST));

    window.FB.logout(function(response) {
        console.log('response', response);
        if (response && !response.error) {
            dispatch(apiSuccess(LOGOUT_SUCCESS, response.status));
            dispatch(apiSuccess(SNACKBAR_SHOW, 'Logout successfully!'));
            dispatch(push('/login'));
        } else {
            dispatch(apiFail(LOGOUT_FAIL));
            dispatch(apiFail(SNACKBAR_SHOW, 'Logout failed!'));
            dispatch(push('/'));
        }
    });
};