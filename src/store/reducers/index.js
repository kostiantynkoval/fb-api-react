import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import snackbar from './snackbar';
import desk from './desk';

export default combineReducers({
    routing: routerReducer,
    auth,
    snackbar,
    desk
});