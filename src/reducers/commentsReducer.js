import _ from 'lodash';
import { 
	DELETE_COMMENT,
	GET_COMMENT, 
	GET_RESTAURANT_COMMENTS, 
	HIDE_COMMENT_EDIT_FORM, 
	SHOW_COMMENT_EDIT_FORM
} from '../actions/types';

const INITIAL_STATE = {
	editingComment: false,
	ids: {},
	list: [],
	targetComment: '',
	restaurant: ''
}

const commentsReducer = (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_COMMENT:
			return {
				...state,
				targetComment: action.payload.data
			}

		case GET_RESTAURANT_COMMENTS:
			return {
				...state,
				restaurant: _.omit(action.payload.data, ['comments']),
				list: [...action.payload.data.comments],
				ids: {..._.mapKeys(action.payload.data.comments,  '_id')}
			}

		case SHOW_COMMENT_EDIT_FORM:
			return {
				...state,
				editingComment: true
			}

		case HIDE_COMMENT_EDIT_FORM:
			return {
				...state,
				editingComment: false
			}

		case DELETE_COMMENT:
			return _.omit(state, action.payload)

		default:
			return state;
	}
};

export default commentsReducer;