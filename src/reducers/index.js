import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import geolocationReducer from './geolocationReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	coords: geolocationReducer
});