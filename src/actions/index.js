import auth from '../apis/auth';
import restaurants from '../apis/restaurants';
import comments from '../apis/comments';
import {
	LOG_IN,
	LOG_OUT,
	REGISTER_USER,
	GET_COORDS,
	GEOLOCATION_DENIED,
	RENDER_LIST,
	TOGGLE_REGISTER,
	TOGGLE_LOGIN, 
	GET_PHOTOS,
	POST_COMMENT,
	GET_USER_RESTAURANTS,
	SHOW_RESTAURANT_COMMENTS
} from './types';

export const registerUser = formValues => async dispatch => {
	const response = await auth.post('/register', { ...formValues });
	if (response.status === 200) {
		const newUser = await response.data;
		dispatch({ type: REGISTER_USER, payload: newUser })
	}
}

export const logIn = formValues => async dispatch => {
	const response = await auth.post('/login', { ...formValues});
	if (response.status === 200) {
		const loginResponse =  await response.data;
		dispatch({ type: LOG_IN, payload: loginResponse });	
	}
}

export const logOut = () => async dispatch => {
	const response = await auth.get('/logout');
	if (response.status === 200) {
		dispatch({ type: LOG_OUT });
	}
}

export const getCoords = () => dispatch => {
	const geolocation = navigator.geolocation;
	if (geolocation) {
		let errorMessage = '';
		let lat;
		let lng;
		geolocation.getCurrentPosition(
			function(position) {
				lat =  position.coords.latitude;
				lng = position.coords.longitude;
				dispatch({ type: GET_COORDS, payload: { lat: lat, lng: lng, errorMessage: errorMessage } });
			},
			async function(err) {
				if (err.code === 1 ) {
					errorMessage = err.message;
					dispatch({ type: GEOLOCATION_DENIED, payload: {lat: null, lng: null, errorMessage: errorMessage} });
				};
				if (err.code === 2 ) {
					errorMessage = err.message;
					dispatch({ type: GEOLOCATION_DENIED, payload: { lat: null, lng: null, errorMessage: errorMessage } });
				};
				if (err.code === 3 ) {
					errorMessage = err.message;
					dispatch({ type: GEOLOCATION_DENIED, payload: { lat: null, lng: null, errorMessage: errorMessage } });
				};
			}
		)
	}	
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

export const getPhotos = () => async (dispatch, getState) => {
	const { lat, lng } = await getState().coords;
	const response = await restaurants.get('/nearby?searchTerm=' + lat + ',' + lng);
	if (response.status === 200) {
		const photos = response.photos;
		dispatch({ type: GET_PHOTOS, payload: photos })
	}
}

export const postComment = (formValues) => async dispatch => {
	const response = await restaurants.post(`/${formValues.place_id}/comment`, {...formValues});
	if (response.status === 200) {
		dispatch({ type: POST_COMMENT, payload: response.data });
	}
}

export const showRestaurantComments = (place_id) => async dispatch => {
	const response = await comments.get(`/restaurants/${place_id}`)
	if (response.ok) {
		const { restaurant } = response;
		dispatch({ type: SHOW_RESTAURANT_COMMENTS, payload: restaurant });
	}
}


export const getUserRestaurantInfo = () => async (dispatch, getState) => {
	const id = getState().auth.user._id;
	const response = await auth.get(`/usercomments/${id}`);
	if (response.status === 200) {
		dispatch({ type: GET_USER_RESTAURANTS, payload: response.data })
	}
}