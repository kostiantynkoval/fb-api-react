import {
    SNACKBAR_SHOW,
    SNACKBAR_HIDE
} from '../constants';

const initialState = {
    isSnackbarVisible: false,
    snackbarMessage: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SNACKBAR_SHOW:
            console.log('action.payload1', action.payload);
            return {
                ...state,
                isSnackbarVisible: false,
                snackbarMessage: action.payload
            };
        case SNACKBAR_HIDE:
            return {
                ...state,
                isSnackbarVisible: false,
                snackbarMessage: ''
            };
        default:
            return {
                ...state
            }
    }
}