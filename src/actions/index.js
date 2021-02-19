import auth from '../apis/auth';
import restaurants from '../apis/restaurants';
import comments from '../apis/comments';
import {
	GET_COORDS,
	GET_RESTAURANT,
	GET_USER_RESTAURANTS,
	GEOLOCATION_DENIED,
	HIDE_COMMENT_FORM,
	LOG_IN,
	LOG_OUT,
	POST_COMMENT,
	REGISTER_USER,
	RENDER_LIST,
	SHOW_RESTAURANT_COMMENTS,
	SHOW_COMMENT_FORM,
	TOGGLE_LOGIN,
	TOGGLE_REGISTER
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

export const showCommentForm = () => dispatch => {
	dispatch({ type: SHOW_COMMENT_FORM })
}

export const hideCommentForm = () => dispatch => {
	dispatch({ type: HIDE_COMMENT_FORM })
}

export const toggleCommentForm = () => async (dispatch, getState) => {
	const { addingComment } = await getState().restaurant;
	if (addingComment) {
		dispatch({ type: HIDE_COMMENT_FORM })
	}
	if (!addingComment) {
		dispatch({ type: SHOW_COMMENT_FORM })
	}
}

export const postComment = (formValues) => async dispatch => {
	const response = await restaurants.post(`/${formValues.place_id}/comment`, {...formValues});
	if (response.status === 200) {
		dispatch({ type: POST_COMMENT, payload: response.data });
	}
}


export const getRestaurant = (place_id) => async dispatch => {
	const response = await restaurants.get(`/${place_id}`);
	if (response.status === 200) {
		const restaurant = response.data;
		dispatch({  type: GET_RESTAURANT, payload: restaurant });
	}
}

export const showRestaurantComments = () => async (dispatch, getState) => {
	const { place_id } = await getState().restaurant.targetRestaurant;
	const response = await comments.get(`/restaurant/${place_id}`);
	if (response.ok) {
		const { restaurant } = await response;
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