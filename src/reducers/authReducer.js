import { 
	LOG_IN,
	LOG_OUT,
	REGISTER_USER,
	TOGGLE_REGISTER,
	TOGGLE_LOGIN 
} from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRegistered: false,
	userName: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOG_IN: 
			return {
				...state,
				isLoggedIn: true,
				isRegistered: true,
				userName: action.payload.data.userName

			};
		case LOG_OUT: 
			return {
				...state,
				isLoggedIn: false,
				isRegistered: false,
				userName: ''
			};
		case REGISTER_USER:
			return {
				...state,
				isLoggedIn: false,
				isRegistered: true,
				userName: action.payload.data.userName
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
		default: 
			return state;
	}
};

export default authReducer;