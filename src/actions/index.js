import auth from '../apis/auth';
// import restaurants from '../apis/restaurants';
import {
	LOG_IN,
	LOG_OUT,
	REGISTER_USER,
	GET_COORDS,
	GEOLOCATION_DENIED
} from './types';


export const registerUser = formValues => async dispatch => {
	const response = await auth.post('/register', { ...formValues });
	const { user } = await response.data;
	dispatch({ type: REGISTER_USER, payload: user });

	//nav to login

};


export const logIn = (formValues, lat, lng )=> async dispatch => {
	const response = await auth.post('/login', { ...formValues});
	dispatch({ type: LOG_IN, payload: response });
	
	//navigate to late restaurants list
	// restaurants.get(`/restaurants/nearby${lat + lng}`);
};


export const logOut = async dispatch => {
	const response = await auth.get('/logout');
	dispatch({ type: LOG_OUT, payload: response.data });

	// navigate to login
	// auth.get('/');
};


export const getCoords = () => async dispatch => {
	const geolocation = await window.navigator.geolocation;
	geolocation.getCurrentPosition(
		async position => {
			const lat = await position.coords.latitude;
			const lng = await position.coords.longitude;
			dispatch({ type: GET_COORDS, payload: {lat: lat, lng: lng} });
		}
	);
};

export const locationDenied = () => async dispatch => {
	const geolocation = window.navigator.geolocation;
	geolocation.getCurrentPosition(
		err => {
			if (err.code === 1) {
				const errorMessage = "Location denied."
				dispatch({ type: GEOLOCATION_DENIED, payload: errorMessage });
			}
		}
	);
};


