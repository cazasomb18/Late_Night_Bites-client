import React from 'react';
import { connect } from 'react-redux';

import { getUserRestaurantInfo } from '../../actions';

class Dashboard extends React.Component {

	componentDidMount(){
		if (this.props.userRestaurants && this.props.userComments) {
			this.props.getUserRestaurantInfo();
		}
	}
	render(){
		// console.log(this.props);
		return(
			<div>
				Dashboard.js
			</div>
		); 
	}

};

const mapStateToProps = (state) => {
	return {
		userComments: state.auth.user.comments,
		userRestaurants: state.auth.user.restaurants,
		userName: state.auth.user.userName
	}
};

export default connect(
	mapStateToProps,
	{ getUserRestaurantInfo }
)(Dashboard);