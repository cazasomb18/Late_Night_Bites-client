import React from 'react';
import { connect } from 'react-redux';

import { showRestaurantComments } from '../../actions';

class RestaurantShow extends React.Component {
	componentDidMount(){
		this.props.showRestaurantComments(this.props.restaurant.place_id)

	}

	renderRestaurant = () => {
		console.log("ARE WE DOING THIS?")
		return (
			<div>{this.props.restaurant}</div>
		)
	}

	render(){
		console.log(this.props);
		return (
			<div>
				<h1>RESTAURANT SHOW</h1>
			</div>
		); 
	}

};

const mapStateToProps = (state) => {
	return {
		restaurant: state.restaurant
	}
};

export default connect(
	mapStateToProps,
	{ showRestaurantComments }
)(RestaurantShow)