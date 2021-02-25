import React from 'react';
import { connect } from 'react-redux';

// import RestaurantShow from '../restaurants/RestaurantShow';

import { 
	getRestaurant,
	getRestaurantComments, 
	getUserRestaurantInfo, 
	toggleDash,
	toggleRestaurantView
} from '../../actions';

class Dashboard extends React.Component {

	componentDidMount(){
	}

	onDashButtonClick = async (e) => {
		await this.props.getUserRestaurantInfo();
		this.props.toggleDash();
	}

	// onShowButtonCick = async (e, place_id) => {
	// 	await this.props.getRestaurant(place_id);
	// 	await this.props.getRestaurantComments();
	// 	await this.props.toggleDash();
	// 	await this.props.toggleRestaurantView();
	// }

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
				const comments = restaurant.comments.map((comment, i) => {
					const _id = comment._id;
					return (
						<div key={_id}>
							<h5>
								"{comment.commentBody}"
							</h5>
							<h5>
								Author: {comment.commentAuthor}
							</h5>
						</div>
					);
				})
				return (
					<div className="ui list" key={place_id}>
						<h3 className="ui header">{restaurant.name}</h3>
						<h4 className="ui sub">{restaurant.address}</h4>
						<div className="ui list">
							<button 
								style={{float: "right"}}
								className="ui blue button"
								onClick={async(e) => {
									await this.props.getRestaurant(place_id);
									await this.props.getRestaurantComments();
									this.props.toggleDash();
									this.props.toggleRestaurantView();

								}}
							>SHOW</button>
							<h4 className="ui sub">COMMENTS</h4>
							{comments}
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
		if (this.props.viewingRestaurant){
			return <div><h1 className="ui headline">RESTAURANT SHOW</h1></div>;
		}
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
		place_id: state.restaurant.targetRestaurant.place_id,
		viewingRestaurant: state.restaurants.viewingRestaurant
	}
};

export default connect(
	mapStateToProps,
	{ 
		getRestaurant,
		getRestaurantComments,
		getUserRestaurantInfo,
		toggleDash,
		toggleRestaurantView
	 }
)(Dashboard);