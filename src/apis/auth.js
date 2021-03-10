import axios from 'axios';

export default axios.create({
	baseURL: process.env.REACT_APP_HEROKU_BACK_END_URL + '/auth'
})