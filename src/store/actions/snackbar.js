import { apiRequest, apiSuccess } from '../actions/api'

import {
    SNACKBAR_SHOW,
    SNACKBAR_HIDE
} from '../constants';


export const showSnackbarAction = (message) => dispatch => {
    dispatch(apiRequest(SNACKBAR_SHOW, message));
};

export const hideSnackbarAction = () => dispatch => {
    dispatch(apiSuccess(SNACKBAR_HIDE));
};