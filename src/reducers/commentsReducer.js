import _ from 'lodash';
import { 
	GET_RESTAURANT_COMMENTS, 
	GET_COMMENT, 
	SHOW_COMMENT_EDIT_FORM,
	HIDE_COMMENT_EDIT_FORM 
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
		case GET_RESTAURANT_COMMENTS:
			return {
				...state,
				restaurant: _.omit(action.payload.data, ['comments']),
				list: [...action.payload.data.comments],
				ids: {..._.mapKeys(action.payload.data.comments,  '_id')}
			}
		case GET_COMMENT:
			return {
				...state,
				targetComment: action.payload.data
			}
		case HIDE_COMMENT_EDIT_FORM:
			return {
				...state,
				editingComment: false
			}
		case SHOW_COMMENT_EDIT_FORM:
			return {
				...state,
				editingComment: true
			}
		default:
			return state;
	}
};

export default commentsReducer;