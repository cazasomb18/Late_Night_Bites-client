import React from 'react';
import { connect } from 'react-redux';

import { getUserRestaurantInfo } from '../../actions';

class Dashboard extends React.Component {

	componentDidMount(){
		if (this.props.loggedIn){
			this.props.getUserRestaurantInfo();
		}
	}
	render(){
		// console.log("DASH PROPS: \n", this.props);
		return(
			<div>
				Dashboard.js
			</div>
		); 
	}

};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		loggedIn: state.auth.isLoggedIn,
		comments: state.auth.comments,
		restaurants: state.auth.restaurants
	}
};

export default connect(
	mapStateToProps,
	{ getUserRestaurantInfo }
)(Dashboard);