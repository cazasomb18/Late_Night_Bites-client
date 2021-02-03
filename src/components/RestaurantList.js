import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants } from '../actions';

class RestaurantList extends React.Component {
	componentDidMount(){
		if (this.props.isLoggedIn) {
			this.props.getRestaurants();
		}
	}

	render(){
		// console.log(this.props);
		if (this.props.isLoggedIn) {
			return <div>RestaurantList</div>;
		}
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		restaurants: state.restaurants,
		isLoggedIn: state.auth.isLoggedIn
	}
};

export default connect(
	mapStateToProps, 
	{ getRestaurants }
)(RestaurantList);