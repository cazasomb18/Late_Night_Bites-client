import React from 'react';
import { connect } from 'react-redux';

import { showRestaurantComments } from '../../actions';

class RestaurantShow extends React.Component {
	componentDidMount(){
		if (this.props.place_id !== undefined){
			this.props.showRestaurantComments(this.props.place_id);
		}
	}

	renderRestaurant = props => {
		return (
			<div>
				<h2>{this.props.restaurant.name}</h2>
			</div>
		)
	}

	render(){
		console.log(this.props);
		return (
			<div>
				<h2 className="ui header">Restaurant Show</h2>
			</div>
		); 
	}

};

const mapStateToProps = (state) => {
	return {
		comments: state.restaurant,
	}
};

export default connect(
	mapStateToProps,
	{ showRestaurantComments }
)(RestaurantShow)