import React from 'react';
import { connect } from 'react-redux';

import { showRestaurantComments, getRestaurant } from '../../actions';

class RestaurantShow extends React.Component {
	componentDidMount(){
<<<<<<< HEAD
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
=======
		this.props.getRestaurant(this.props.place_id);
	}

	renderRestaurant = props => {
		if (this.props.reducerRestaurant) {
			this.props.showRestaurantComments(this.props.place_id);
			return (
				<div className="ui list">
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.reducerRestaurant.name}</h2>
					<h3 className="ui headline">{this.props.reducerRestaurant.address}</h3>
					<div className="ui sizer vertical segment">
						<h4 className="ui medium header">Comments</h4>
						<div className="ui list">
							{this.renderComments()}
						</div>
					</div>
				</div>
			)
		}
		if (!this.props.reducerRestaurant){
			return (
				<div>
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.restaurant.name}</h2>
					{this.renderComments()}
				</div>
			);
		}
	}

	renderComments = (props)=> {
		if (this.props.reducerRestaurant){
			if (this.props.comments.length > 1) {
				return <div>COMMENTS GREATER THAN 1</div>
			}
			if (!this.props.comments) {
				return (
					<div>
						<h4 className="semantic ui headline">NO COMMENTS FOUND</h4>
					</div>
				)
			}
			if (this.props.comments.length === 1) {
				return (
					<div className="ui celled list">
						<h5 className="ui headline">{this.props.comments[0].commentBody}</h5>
						<h5 className="ui headline">by: {this.props.comments[0].commentAuthor}</h5>
					</div>
				)
			}
		} else {
			return <div>NO MONGO DB ENTRY FOR THIS RESTAURANT</div>;
		}
>>>>>>> css1
	}

	render(){
		console.log(this.props);
		return (
			<div>
<<<<<<< HEAD
				<h2 className="ui header">Restaurant Show</h2>
=======
				<h2 className="ui header">RESTAURANT SHOW</h2>
				{this.renderRestaurant()}
>>>>>>> css1
			</div>
		); 
	}

};

const mapStateToProps = state => {
	return {
<<<<<<< HEAD
		comments: state.restaurant,
=======
		reducerRestaurant: state.restaurant.targetRestaurant,
		comments: state.restaurant.comments

>>>>>>> css1
	}
};


export default connect(
	mapStateToProps,
	{ showRestaurantComments, getRestaurant }
)(RestaurantShow)