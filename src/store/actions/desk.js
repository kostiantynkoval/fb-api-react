import {apiRequest, apiSuccess} from '../actions/api'

import {
    BASE_URL,
    UPLOAD_FILES_REQUEST,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAIL,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAIL,
    REORDER_TODO_SUCCESS,
    ADD_LIST_REQUEST,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAIL,
    RENAME_LIST_REQUEST,
    RENAME_LIST_SUCCESS,
    RENAME_LIST_FAIL,
    REMOVE_LIST_REQUEST,
    REMOVE_LIST_SUCCESS,
    REMOVE_LIST_FAIL,
    REORDER_LIST_SUCCESS,
    LIST_MODAL_HIDE,
} from '../constants';


// upload new item
export const uploadFilesAction = (items) => dispatch => {
    dispatch(apiRequest(UPLOAD_FILES_REQUEST));

    console.log('items to upload', items);

    window.FB.api(
        '/580838048702436/photos/',
        'POST',
        {'source': items},
        function(response) {
            if (response && !response.error) {
                console.log('upload result:', response);
            } else {
                console.log('upload result error:', response);
            }
        }
    );
}

//add new list
export const addListAction = (items) => dispatch => {
    dispatch(apiRequest(ADD_LIST_REQUEST));

    setTimeout(() => addTodo(), 500);
    function addTodo() {
        dispatch(apiSuccess(ADD_LIST_SUCCESS, items))
    }

}

// reordering items
export const reorderTodoAction = todoData => dispatch => {
    setTimeout(() => reorderTodo(), 500);
    function reorderTodo() {
        dispatch(apiSuccess(REORDER_TODO_SUCCESS, todoData))
    }

}

// reordering lists
export const reorderListAction = listData => dispatch => {
    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(REORDER_LIST_SUCCESS, listData))
    }

}

// delete list
export const removeListAction = items => dispatch => {
    dispatch(apiRequest(REMOVE_LIST_REQUEST));

    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(REMOVE_LIST_SUCCESS, items))
    }

}


export const renameListAction = items => dispatch => {
    dispatch(apiRequest(RENAME_LIST_REQUEST));

    setTimeout(() => reorderList(), 500);
    function reorderList() {
        dispatch(apiSuccess(RENAME_LIST_SUCCESS, items))
        dispatch(apiRequest(LIST_MODAL_HIDE))
    }

}