import { 
	POST_COMMENT,
	GET_RESTAURANT,
	GET_RESTAURANT_PHOTO,
	SHOW_COMMENT_FORM,
	HIDE_COMMENT_FORM
} from '../actions/types';

const INITIAL_STATE = {
	addingComment: false,
	targetRestaurant: '',
	newRestaurant: '',
	newComment: '',
	photos: ''
}

const restaurantReducer = (state=INITIAL_STATE, action ) => {
	switch(action.type) {
		case SHOW_COMMENT_FORM:
			return {
				...state,
				addingComment: true,
			}
		case HIDE_COMMENT_FORM:
			return {
				...state,
				addingComment: false
			}
		case POST_COMMENT:
			return {
				...state,
				newRestaurant: action.payload.restaurant,
				newComment: action.payload.newComment
			}
		case GET_RESTAURANT:
			return {
				...state,
				targetRestaurant: action.payload.data
			}
		case GET_RESTAURANT_PHOTO:
			return {
				...state,
				photo: action.payload.data
			}
		default: 
			return state;
	}
};

export default restaurantReducer;