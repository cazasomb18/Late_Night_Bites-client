import { 
	POST_COMMENT, 
	SHOW_RESTAURANT_COMMENTS,
	GET_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = {
	targetRestaurant: '',
	newRestaurant: '',
	comments: '',
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
				comments: [...action.payload.comments]
			}
		case GET_RESTAURANT:
			return {
				...state,
				targetRestaurant: action.payload.data
			}
		default: 
			return state;
	}
};

export default restaurantReducer;