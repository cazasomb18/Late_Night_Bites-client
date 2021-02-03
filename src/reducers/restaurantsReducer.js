// import _ from 'lodash';

import { RENDER_LIST } from '../actions/types';

const restaurantsReducer = (state = {}, action) => {
	switch(action.type) {
		case RENDER_LIST:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};


export default restaurantsReducer;