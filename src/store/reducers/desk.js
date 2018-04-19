import {
    UPLOAD_FILES_REQUEST,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAIL,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_SELECT_SUCCESS,
    GET_ALBUMS_FAIL,
    GET_MORE_ALBUMS_REQUEST,
    GET_MORE_ALBUMS_SUCCESS,
    GET_MORE_ALBUMS_FAIL,
    GET_ALBUM_PHOTOS_REQUEST,
    GET_ALBUM_PHOTOS_SUCCESS,
    GET_ALBUM_PHOTOS_FAIL,
    GET_MORE_PHOTOS_REQUEST,
    GET_MORE_PHOTOS_SUCCESS,
    GET_MORE_PHOTOS_FAIL,
    GET_PHOTO_REQUEST,
    GET_PHOTO_SUCCESS,
    GET_PHOTO_FAIL
} from '../constants';

const initialState = {
    isRequesting: false,
    albums: [],
    albumsPaging: '',
    isAlbumsNext: false,
    photos: [],
    photosPaging: '',
    isPhotosNext: false,
    singlePhoto: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALBUMS_REQUEST:
        case UPLOAD_FILES_REQUEST:
        case GET_ALBUM_PHOTOS_REQUEST:
        case GET_MORE_PHOTOS_REQUEST:
        case GET_MORE_ALBUMS_REQUEST:
        case GET_PHOTO_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                albums: [...action.payload.data],
                albumsPaging: action.payload.paging.cursors.after,
                isAlbumsNext: !!action.payload.paging.next
            };
        case GET_ALBUMS_SELECT_SUCCESS:
            return {
                ...state,
                albums: [...action.payload.data],
            };
        case GET_ALBUMS_FAIL:
            return {
                ...state,
                isRequesting: false,
                albums: [],
                albumsPaging: '',
                isAlbumsNext: false
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
                photos: [...action.payload.data],
                photosPaging: action.payload.paging.cursors.after,
                isPhotosNext: !!action.payload.paging.next
            };
        case GET_ALBUM_PHOTOS_FAIL:
            return {
                ...state,
                isRequesting: false,
                photos: [],
                photosPaging: '',
                isPhotosNext: false
            };
        case GET_MORE_PHOTOS_SUCCESS:
            const addArrPhotos = [...state.photos, ...action.payload.data];
            return {
                ...state,
                isRequesting: false,
                photos: addArrPhotos,
                photosPaging: action.payload.paging.cursors.after,
                isPhotosNext: !!action.payload.paging.next
            };
        case GET_MORE_PHOTOS_FAIL:
            return {
                ...state,
                isRequesting: false,
                photos: [],
                photosPaging: '',
                isPhotosNext: false
            };
        case GET_MORE_ALBUMS_SUCCESS:
            const addArrAlbums = [...state.albums, ...action.payload.data];
            return {
                ...state,
                isRequesting: false,
                albums: addArrAlbums,
                albumsPaging: action.payload.paging.cursors.after,
                isAlbumsNext: !!action.payload.paging.next
            };
        case GET_MORE_ALBUMS_FAIL:
            return {
                ...state,
                isRequesting: false,
                albums: [],
                albumsPaging: '',
                isAlbumsNext: false
            };
        case GET_PHOTO_SUCCESS:
            return {
                ...state,
                singlePhoto: action.payload
            };
        case GET_PHOTO_FAIL:
            return {
                ...state,
                singlePhoto: {}
            };
        default:
            return {
                ...state
            }
    }
}