import {
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

const initialState = {
    isRequesting: false,
    albums: {},
    currentAlbumPhotos: [],
    currentAlbumPaging: {}

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALBUMS_REQUEST:
        case UPLOAD_FILES_REQUEST:
        case GET_ALBUM_PHOTOS_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                albums: {...action.payload},
            };
        case GET_ALBUMS_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case UPLOAD_FILES_SUCCESS:
            return {
                ...state,
                isRequesting: false,
            };
        case UPLOAD_FILES_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case GET_ALBUM_PHOTOS_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                currentAlbumPhotos: action.payload.data,
                currentAlbumPaging: action.payload.paging
            };
        case GET_ALBUM_PHOTOS_FAIL:
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