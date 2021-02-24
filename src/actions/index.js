import auth from '../apis/auth';
import restaurants from '../apis/restaurants';
import comments from '../apis/comments';
import {
	DELETE_COMMENT,
	EDIT_COMMENT,
	GET_COORDS,
	GET_COMMENT,
	GET_RESTAURANT,
	GET_RESTAURANT_COMMENTS,
	GET_RESTAURANT_FAILED,
	GET_USER_RESTAURANTS,
	GEOLOCATION_DENIED,
	HIDE_COMMENT_FORM,
	HIDE_COMMENT_EDIT_FORM,
	HIDE_RESTAURANT,
	LOG_IN,
	LOG_OUT,
	POST_COMMENT,
	REGISTER_USER,
	RENDER_LIST,
	SHOW_COMMENT_FORM,
	SHOW_COMMENT_EDIT_FORM,
	SHOW_RESTAURANT,
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
					dispatch({ type: GEOLOCATION_DENIED, payload: { lat: null, lng: null, errorMessage: errorMessage } });
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


export const toggleCommentForm = () => async (dispatch, getState) => {
	const { addingComment } = await getState().restaurant;
	if (addingComment) {
		dispatch({ type: HIDE_COMMENT_FORM })
	}
	if (!addingComment) {
		dispatch({ type: SHOW_COMMENT_FORM })
	}
}


export const toggleRestaurantView = () => async (dispatch, getState) => {
	const { viewingRestaurant } = await getState().restaurants;
	if (viewingRestaurant) {
		dispatch({ type: HIDE_RESTAURANT })
	}
	if (!viewingRestaurant) {
		dispatch({ type: SHOW_RESTAURANT })
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
	if (response.status === 400) {
		dispatch({ type: GET_RESTAURANT_FAILED });
	}
}


export const getRestaurantComments = () => async (dispatch, getState) => {
	const { place_id } = await getState().restaurant.targetRestaurant;
	const response = await comments.get(`/restaurant/${place_id}`);
	if (response.status === 200) {
		const restaurant = response.data;
		dispatch({ type: GET_RESTAURANT_COMMENTS, payload: restaurant });
	}
}


export const getUserRestaurantInfo = () => async (dispatch, getState) => {
	const id = getState().auth.user._id;
	const response = await auth.get(`/usercomments/${id}`);
	if (response.status === 200) {
		dispatch({ type: GET_USER_RESTAURANTS, payload: response.data })
	}
}


export const editComment = (comment_id, formValues, getState) => async dispatch => {
	const { place_id } = await getState().restaurant.targetRestaurant;
	const response = await comments.put(`/restaurant/${place_id}/edit/${comment_id}`, {...formValues});
	if (response.status === 200) {
		dispatch({ type: EDIT_COMMENT, payload: response });
	}
}


export const toggleEditCommentView = () => async (dispatch, getState) => {
	const { editingComment } = await getState().comments;
	if (!editingComment) {
		dispatch({ type: SHOW_COMMENT_EDIT_FORM })
	}
	if (editingComment) {
		dispatch({ type: HIDE_COMMENT_EDIT_FORM })
	}
}


export const deleteComment = id => async (dispatch, getState) => {
	const { place_id } = await getState().restaurant.targetRestaurant;
	const response = await comments.delete(`/restaurant/${place_id}/${id}`);
	dispatch({ type: DELETE_COMMENT });
}


export const getComment = id => async dispatch => {
	const response = await comments.get(`/${id}`);
	if (response.status === 200) {
		dispatch({ type: GET_COMMENT, payload: response.data });
	}
}



