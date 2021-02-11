import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants, getCoords } from '../../actions';
import RenderList from './RenderList';

class RestaurantList extends React.Component {
	componentDidMount(){

	}

	render(){
		if (this.props.isLoggedIn && this.props.lat && this.props.lng) {
			return (
				<div className="ui list">
					<h2 className="ui header">Late Restaurants List</h2>
					<RenderList/>
				</div>
			); 
		}
		return null;
	}
};

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		isLoggedIn: state.auth.isLoggedIn
	}
};

export default connect(
	mapStateToProps, 
	{ getRestaurants, getCoords }
)(RestaurantList);