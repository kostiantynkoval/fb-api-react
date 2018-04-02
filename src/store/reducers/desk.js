import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAIL,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
    REMOVE_TODO_FAIL,
    REORDER_TODO_REQUEST,
    REORDER_TODO_SUCCESS,
    REORDER_TODO_FAIL,
    ADD_LIST_REQUEST,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAIL,
    REMOVE_LIST_REQUEST,
    REMOVE_LIST_SUCCESS,
    REMOVE_LIST_FAIL,
    REORDER_LIST_REQUEST,
    REORDER_LIST_SUCCESS,
    REORDER_LIST_FAIL
} from '../constants';

const initialState = {
    isRequesting: false,
    items: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_REQUEST:
        case ADD_LIST_REQUEST:
        case REMOVE_TODO_REQUEST:
        case REMOVE_LIST_REQUEST:
        case REORDER_TODO_REQUEST:
        case REORDER_LIST_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case ADD_TODO_SUCCESS:
        case ADD_LIST_SUCCESS:
        case REMOVE_TODO_SUCCESS:
        case REMOVE_LIST_SUCCESS:
        case REORDER_TODO_SUCCESS:
        case REORDER_LIST_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                items: action.payload,
            };
        case ADD_TODO_FAIL:
        case ADD_LIST_FAIL:
        case REMOVE_TODO_FAIL:
        case REMOVE_LIST_FAIL:
        case REORDER_TODO_FAIL:
        case REORDER_LIST_FAIL:
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