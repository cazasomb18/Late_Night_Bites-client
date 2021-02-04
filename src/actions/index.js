// import _ from 'lodash';
import auth from '../apis/auth';
import restaurants from '../apis/restaurants';
import {
	LOG_IN,
	LOG_OUT,
	REGISTER_USER,
	GET_COORDS,
	GEOLOCATION_DENIED,
	RENDER_LIST,
	TOGGLE_REGISTER,
	TOGGLE_LOGIN
} from './types';


export const registerUser = formValues => async dispatch => {
	const response = await auth.post('/register', { ...formValues });
	if (response.status === 200) {
		const newUser = await response.data;
		dispatch({ type: REGISTER_USER, payload: newUser })
	}
	return;
}


export const logIn = formValues => async dispatch => {
	const response = await auth.post('/login', { ...formValues});
	if (response.status === 200) {
		const loginResponse =  await response.data;
		dispatch({ type: LOG_IN, payload: loginResponse });	
	}
	return;
	//navigate to late restaurants list
}


export const logOut = () => async dispatch => {
	const response = await auth.get('/logout');
	if (response.status === 200) {
		dispatch({ type: LOG_OUT });
	}
	// navigate to login
	// auth.get('/');
}


export const getCoords = () => async dispatch => {
	const geolocation = window.navigator.geolocation;
	geolocation.getCurrentPosition(
		async position => {
			const lat = await position.coords.latitude;
			const lng = await position.coords.longitude;
			dispatch({ type: GET_COORDS, payload: { lat: lat, lng: lng, errorMessage: '' } });
		}
	);
}

export const locationDenied = () => async dispatch => {
	const geolocation = window.navigator.geolocation;
	geolocation.getCurrentPosition(
		err => {
			if (err.code === 1) {
				const errorMessage = "Location denied.  Please enable location services."
				dispatch({ type: GEOLOCATION_DENIED, payload: errorMessage });
			}
		}
	);
}

export const getRestaurants = () => async (dispatch, getState) =>  {
	const { lat, lng } = await getState().coords;
	const response = await restaurants.get('/nearby?searchTerm=' + lat + ',' + lng);
	if (response.status === 200) {
		const restaurants = response.data;
		dispatch({ type: RENDER_LIST, payload: restaurants });
	}
}

export const toggleRegisterForm = () => dispatch => {
	dispatch({ type: TOGGLE_REGISTER })
}

export const toggleLogInForm = () => dispatch => {
	dispatch({ type: TOGGLE_LOGIN })
}


