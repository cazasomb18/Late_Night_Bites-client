import { POST_COMMENT, SHOW_RESTAURANT_COMMENTS } from '../actions/types';

const INITIAL_STATE = {
	restaurant: '',
	comments: []
}

const restaurantReducer = (state=INITIAL_STATE, action ) => {
	switch(action.type) {
		case POST_COMMENT:
			return {
				...state,
				restaurant: action.payload.restaurant,
				commments: [action.payload.newComment]
			}
		case SHOW_RESTAURANT_COMMENTS: 
			return {
				...state,
				restaurant: action.payload.data.foundRestaurant
			}
		default: 
			return state;
	}
};

export default restaurantReducer;