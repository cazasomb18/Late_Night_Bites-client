import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants, getCoords } from '../actions';

class RestaurantList extends React.Component {
	componentDidMount(){
		if (this.props.isLoggedIn) {
			this.props.getCoords();
			this.props.getRestaurants();
		}
	}

	renderList(){
		if (this.props.restaurants) {
			return this.props.restaurants.data.results.map( restaurant => {
				return (
					<div className="item" key={restaurant.place_id}>
						<h3>{restaurant.name}</h3>
						<div className="description">
							<h5>{restaurant.vicinity}</h5>
						</div>
					</div>
				);
			})
		}
	}

	render(){
		console.log(this.props);
		if (this.props.isLoggedIn) {
			return (
				<div>
					<h2 className="ui header">Late Restaurants List</h2>
					{this.renderList()}
				</div>
			); 
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
	{ getRestaurants, getCoords }
)(RestaurantList);