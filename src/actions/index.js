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
	TOGGLE_LOGIN, 
	GET_PHOTOS,
	POST_COMMENTS
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


export const getCoords = () => async dispatch => {
	const geolocation = window.navigator.geolocation;
	if (geolocation) {
		let errorMessage = '';
		geolocation.getCurrentPosition(
			async position => {
				const lat = await position.coords.latitude;
				const lng = await position.coords.longitude;
				dispatch({ type: GET_COORDS, payload: { lat: lat, lng: lng, errorMessage: errorMessage } });
			},
			async err => {
				if (err.code === 1 ) {
					errorMessage = await "Location denied. Please enable location services.";
					dispatch({ type: GEOLOCATION_DENIED, payload: {lat: null, lng: null, errorMessage: errorMessage} });
				};
				if (err.code === 2 ) {
					errorMessage = await "Unable to find position - locaiton services unavailable.";
					dispatch({ type: GEOLOCATION_DENIED, payload: { lat: null, lng: null, errorMessage: errorMessage } });
				};
				if (err.code === 3 ) {
					errorMessage = await "Unable to find position - location services timed out.";
					dispatch({ type: GEOLOCATION_DENIED, payload: { lat: null, lng: null, errorMessage: errorMessage } });
				};
			}
		)
	}
	
};

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
	const response = await restaurants.get('/nearby?SearchTerm=' + lat + ',' + lng);
	if (response.status === 200) {
		const photos = response.photos;
		dispatch({ type: GET_PHOTOS, payload: photos })
	}
}

export const createComment = () => async (dispatch, getState) => {
	const user = await getState().auth;
	const { lat, lng } = await getState().coords;
	// const response = await restaurants.post('/' + restaurant.place_id + '/comment/');
	// NEXT STEPS: 
	// 	1 - make an api for the comment.post()
	// 	2 - set the response to comment.post('/whatever')
	// 	3 - action/type: CREATE_COMMENT
	// 	4 - if response.status === 200 dispatch type: CREATE_COMMENT, payload: response.data

}

  // 	postRestaurantComments = async (e)  => {
  // 		// e.preventDefault();
		// try{
	 //        const postComments = await fetch(process.env.REACT_APP_BACK_END_URL + '/restaurants/' + this.state.targetRestaurant.place_id + '/comment/', {
	 //          method: 'POST',
	 //          credentials: 'include',
	 //          body: JSON.stringify({
	 //          	commentAuthor: this.props.userName,
	 //          	commentBody: this.state.commentInput,
	 //          	restaurant_name: this.state.targetRestaurant.name,
	 //          	name: this.state.targetRestaurant.name,
	 //          	address: this.state.targetRestaurant.vicinity,
	 //          	place_id: this.state.targetRestaurant.place_id
	 //          }),


