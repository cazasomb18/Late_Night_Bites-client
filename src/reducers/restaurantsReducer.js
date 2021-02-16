// import _ from 'lodash';
import { RENDER_LIST, POST_COMMENT } from '../actions/types';

const restaurantsReducer = (state = {}, action) => {
	switch(action.type) {
		case RENDER_LIST:
			return { ...state, ...action.payload };

		case POST_COMMENT:
			return {
				...state, 
				comment: action.payload
			};

		default:
			return state;
	}
};


export default restaurantsReducer;