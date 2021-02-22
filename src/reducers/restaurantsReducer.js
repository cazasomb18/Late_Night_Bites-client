import _ from 'lodash';
import { RENDER_LIST, SHOW_RESTAURANT, HIDE_RESTAURANT } from '../actions/types';

const INITIAL_STATE = {
	list: '',
	resLatLng: '',
	viewingRestaurant: false
}

const restaurantsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case RENDER_LIST:
			return { 
				...state, 
				list: _.omit(action.payload.data, ['html_attributions']),
				resLatLng: action.payload.resultLatLng
			}
		case SHOW_RESTAURANT:
			return {
				...state,
				viewingRestaurant: true
			}
		case HIDE_RESTAURANT:
			return {
				...state,
				viewingRestaurant: false
			}
		default:
			return state;
	}
};


export default restaurantsReducer;