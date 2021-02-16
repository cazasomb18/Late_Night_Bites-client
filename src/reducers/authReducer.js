import _ from 'lodash';

import { 
	LOG_IN,
	LOG_OUT,
	REGISTER_USER,
	TOGGLE_REGISTER,
	TOGGLE_LOGIN,
	GET_USER_RESTAURANTS
} from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRegistered: true,
	userName: '',
	user: '',
	restaurants: [],
	comments: []
}

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOG_IN: 
			return {
				...state,
				isLoggedIn: true,
				isRegistered: true,
				userName: action.payload.data.userName,
				user: _.omit(action.payload.data, ['password'])

			};
		case LOG_OUT: 
			return {
				...state,
				isLoggedIn: false,
				isRegistered: false,
				userName: '',
				user: ''
			};
		case REGISTER_USER:
			return {
				...state,
				isLoggedIn: false,
				isRegistered: true,
				userName: action.payload.data.userName,
				user: ''
			};
		case TOGGLE_REGISTER:
			return {
				...state,
				isRegistered: false
			}
		case TOGGLE_LOGIN:
			return {
				...state,
				isRegistered: true
			}
		case GET_USER_RESTAURANTS:
			return {
				...state,
				restaurants: action.payload.foundRestaurants,
				comments: action.payload.foundComments

			}
		default: 
			return state;
	}
};

export default authReducer;