import _ from 'lodash';
import { GET_COORDS, GEOLOCATION_DENIED } from '../actions/types';

const geolocationReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_COORDS: 
			return {...state, ..._.pick(action.payload, 'lat', 'lng', 'errorMessage') };

		case GEOLOCATION_DENIED:
			return {...state, ..._.pick(action.payload, 'lat', 'lng', 'errorMessage') };

		default:
			return state;
	};
};

export default geolocationReducer;