import _ from 'lodash';
import { GET_RESTAURANT_COMMENTS } from '../actions/types';

const INITIAL_STATE = {
	restaurant: '',
	list: [],
	comment: ''

}

const commentsReducer = (state=INITIAL_STATE, action) => {
		switch(action.type) {
			case GET_RESTAURANT_COMMENTS:
				return {
					...state,
					restaurant: _.omit(action.payload.data, ['comments']),
					list: [...action.payload.data.comments]
				}
			default:
				return state;
		}
};

export default commentsReducer;