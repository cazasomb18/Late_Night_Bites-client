import { LOG_IN, LOG_OUT, REGISTER_USER } from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRegistered: false,
	userName: '',
	password: '',
	lat: '',
	lng: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOG_IN: 
			return {
				isLoggedIn: true,
				isRegistered: true,
				userName: action.payload.user.userName,
				password: action.payload.user.password

			};
		case LOG_OUT: 
			return {
				isLoggedIn: false,
				isRegistered: false,
				userName: '',
				password: ''
			};
		case REGISTER_USER:
			return {
				isLoggedIn: false,
				isRegistered: true,
				userName: action.payload.user.useName,
				password: action.payload.user.password
			};
		default: 
			return state;
	}
};

export default authReducer;