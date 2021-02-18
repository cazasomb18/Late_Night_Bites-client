import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import geolocationReducer from './geolocationReducer';
import restaurantsReducer from './restaurantsReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	coords: geolocationReducer,
	restaurants: restaurantsReducer,
	restaurant: restaurantReducer
});