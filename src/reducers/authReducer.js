import _ from 'lodash';
import { 
	CLOSE_DASH,
	LOG_IN,
	LOG_OUT,
	GET_USER_RESTAURANTS,
	OPEN_DASH,
	REGISTER_USER,
	TOGGLE_REGISTER,
	TOGGLE_LOGIN,
} from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRegistered: true,
	userName: '',
	user: '',
	restaurants: [],
	comments: [],
	viewingDash: false,
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
				comments: [...action.payload.data.comments],
				restaurants: [...action.payload.data.restaurants]

			}
		case CLOSE_DASH: 
			return {
				...state,
				viewingDash: false

			}
		case OPEN_DASH: 
			return {
				...state,
				viewingDash: true
			}
		default: 
			return state;
	}
};

export default authReducer;