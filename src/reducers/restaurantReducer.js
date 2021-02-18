// import _ from 'lodash';
import { POST_COMMENT, SHOW_RESTAURANT_COMMENTS } from '../actions/types';

const INITIAL_STATE = {
	restaurant: null,
	newRestaurant: null,
	comments: [],
	newComment: ''
}

const restaurantReducer = (state=INITIAL_STATE, action ) => {
	switch(action.type) {
		case POST_COMMENT:
			return {
				...state,
				newRestaurant: action.payload.restaurant,
				newComment: action.payload.newComment
			}
		case SHOW_RESTAURANT_COMMENTS: 
			return {
				...state,
				comments: [...action.payload.restaurant.coments],
				restaurant: action.payload.restaurant
			}
		default: 
			return state;
	}
};

export default restaurantReducer;