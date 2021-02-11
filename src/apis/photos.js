import axios from 'axios';

export default axios.create({
	baseURL: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
});

//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY