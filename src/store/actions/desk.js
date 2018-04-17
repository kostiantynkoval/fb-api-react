import {apiRequest, apiSuccess} from '../actions/api'

import {
    BASE_URL,
    UPLOAD_FILES_REQUEST,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAIL,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAIL,
    GET_ALBUM_PHOTOS_REQUEST,
    GET_ALBUM_PHOTOS_SUCCESS,
    GET_ALBUM_PHOTOS_FAIL
} from '../constants';
import {apiFail} from "./api";


// upload new item
export const uploadFilesAction = (items) => dispatch => {
    dispatch(apiRequest(UPLOAD_FILES_REQUEST));

    console.log('items to upload', items);

    window.FB.api(
        '/580838048702436/photos',
        'POST',
        { url: items },
        function(response) {
            if (response && !response.error) {
                console.log('upload result:', response);
            } else {
                console.log('upload result error:', response);
            }
        }
    );
}

export const getAlbumsAction = () => dispatch => {
    dispatch(apiRequest(GET_ALBUMS_REQUEST));

    window.FB.api(
        '/me/albums',
        'GET',
        { fields: 'count, cover_photo, updated_time, name'},
        function(response) {
            if (response && !response.error) {
                dispatch(apiSuccess(GET_ALBUMS_SUCCESS, response));


            } else {
                console.log('albums error:', response);
                dispatch(apiFail(GET_ALBUMS_FAIL));
            }
        }
    );
}

export const getAlbumByIdAction = () => dispatch => {
    dispatch(apiRequest(GET_ALBUM_PHOTOS_REQUEST));

    window.FB.api(
        `/580838048702436/photos`,
        'GET',
        {fields:"id",limit:"20"},
        function(response) {
            if (response && !response.error) {
                console.log('album photos:', response);
                dispatch(apiSuccess(GET_ALBUM_PHOTOS_SUCCESS, response));
            } else {
                console.log('album photos error:', response);
                dispatch(apiFail(GET_ALBUM_PHOTOS_FAIL));
            }
        }
    );
}
