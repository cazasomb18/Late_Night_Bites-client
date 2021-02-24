import React from 'react';
import { connect } from 'react-redux';

import { getUserRestaurantInfo, toggleDash } from '../../actions';

class Dashboard extends React.Component {

	componentDidMount(){
		if (this.props.loggedIn) {
			this.props.getUserRestaurantInfo();
		}
	}

	onDashButtonClick = (e) => {
		this.props.toggleDash();
	}

	renderUser(){
		return (
			<div className="ui four column grid">
				<div className="column">
					<h5 className="ui sub">User: {this.props.user.userName}</h5>
				</div>
				<div className="column">
					<h5 className="ui sub">Email: {this.props.user.email}</h5>
				</div>
				<div className="column">
					<h5 className="ui sub">Id: {this.props.user._id}</h5>
				</div>
				<div className="column">
					<h5 className="ui sub">Restaurants: {this.props.restaurants.length}, Comments: {this.props.comments.length}</h5>
				</div>
			</div>
		);
	}

	renderRestaurants(){
		if (this.props.restaurants) {
			return this.props.restaurants.map(( restaurant, i) => {
				const place_id = restaurant.place_id;
				return (
					<div className="ui list" key={place_id}>
						<h3 className="ui header">{restaurant.name}</h3>
						<h4 className="ui sub">{restaurant.address}</h4>
						<div>
							<h4 className="ui sub">COMMENTS</h4>
						</div>
					</div>
				);
			})
		}
		if (!this.props.restaurants) {
			return(
				<div>
					<h3 className="ui headline">NO RESTAURANTS FOUND</h3>
				</div>
			); 
		}
	}

	renderComponent(){
		if (!this.props.loggedIn) {
			return null;
		}
		if (!this.props.viewingDash) {
			return(
				<div>
					<button 
						style={{float: "right"}}
						className="ui primary button"
						onClick={this.onDashButtonClick}
					>DASHBOARD</button>
				</div>
			); 
		}
		if (this.props.viewingDash) {
			return (
				<div>
					<h1 className="ui headline">Welcome to your Dashboard, {this.props.user.userName}</h1>
					<div>{this.renderUser()}</div>
					<h3 className="ui headline">{}</h3>
					{this.renderRestaurants()}
					<button 
						style={{float: "right"}}
						className="ui red button"
						onClick={this.onDashButtonClick}
					>CLOSE DASH</button>
				</div>
			);
		}
	}

	render(){
		console.log("DASH PROPS: \n", this.props);
		return <div>{this.renderComponent()}</div>;
	}

};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		loggedIn: state.auth.isLoggedIn,
		comments: state.auth.comments,
		restaurants: state.auth.restaurants,
		viewingDash: state.auth.viewingDash,
	}
};

export default connect(
	mapStateToProps,
	{ 
		getUserRestaurantInfo,
		toggleDash
	 }
)(Dashboard);