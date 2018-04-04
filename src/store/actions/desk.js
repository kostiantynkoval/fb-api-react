import {apiRequest, apiSuccess} from '../actions/api'

// unused constants are prepared for backend

import {
    BASE_URL,
    GET_ITEMS_FAIL,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
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

export const getItemsAction = () => dispatch => {
    dispatch(apiRequest(GET_ITEMS_REQUEST));

    // getting mock items
    setTimeout(() => getItems(), 500);
    function getItems() {

        const items = [
            {
                name: 'List1',
                id: 'list1',
                items: [
                    {id: 'item-0', name: 'Name', content: 'item 0'}, {id: 'item-1', name: 'Name', content: 'item 1'}, {id: 'item-2', name: 'Name', content: 'item 2'}, {id: 'item-3', name: 'Name', content: 'item 3'},{id: 'item-4', name: 'Name', content: 'item 4'}, {id: 'item-5', name: 'Name', content: 'item 5'}, {id: 'item-6', name: 'Name', content: 'item 6'}, {id: 'item-7', name: 'Name', content: 'item 7'},{id: 'item-8', name: 'Name', content: 'item 8'}, {id: 'item-9', name: 'Name', content: 'item 9'}, {id: 'item-10', name: 'Name', content: 'item 10'}, {id: 'item-11', name: 'Name', content: 'item 11'}
                ]
            },
            {
                name: 'List2',
                id: 'list2',
                items: [
                    {id: 'item-15', name: 'Name', content: 'item 15'}, {id: 'item-16', name: 'Name', content: 'item 16'}, {id: 'item-12', name: 'Name', content: 'item 12'}, {id: 'item-13', name: 'Name', content: 'item 13'},{id: 'item-14', name: 'Name', content: 'item 14'}
                ]
            },
            {
                name: 'List3',
                id: 'list3',
                items: [
                    {id: 'item-20', name: 'Name', content: 'item 20'}, {id: 'item-21', name: 'Name', content: 'item 21'}, {id: 'item-22', name: 'Name', content: 'item 22'}, {id: 'item-23', name: 'Name', content: 'item 23'},{id: 'item-24', name: 'Name', content: 'item 24'}, {id: 'item-25', name: 'Name', content: 'item 25'}, {id: 'item-26', name: 'Name', content: 'item 26'}
                ]
            }
        ];
        dispatch(apiSuccess(GET_ITEMS_SUCCESS, items))
    }

}

// add new item
export const addTodoAction = (items) => dispatch => {
    dispatch(apiRequest(ADD_TODO_REQUEST));

    setTimeout(() => addTodo(), 500);
    function addTodo() {
        dispatch(apiSuccess(ADD_TODO_SUCCESS, items))
    }

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