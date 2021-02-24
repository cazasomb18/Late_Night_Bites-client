import React from 'react';
import { connect } from 'react-redux';

import CommentButtons from '../comments/CommentButtons';
import ComponentTitle from '../ComponentTitle';
import PostComments from '../comments/PostComments';
import RenderComments from '../comments/RenderComments';

import { 
	getRestaurantComments, 
	toggleCommentForm
} from '../../actions';

//you have a bug here where calling the AC getRestaurant(place_id) does not change the comments displayed...
	//if you have a restaurant in mongodb w/ no comments then the old restaurant's comments remain...
	//SOLUTION: when you dispatch an action.type to set the comments in state, you need to also set up a 
	//COMMENTS_FAILED action.type so that piece of state changes to a falsy value

class RestaurantShow extends React.Component {

	componentDidMount() {
		if (this.props.restaurant.comments.length > 0 ) {
			this.props.getRestaurantComments();
		}
	}

	renderComponent() {
		if (!this.props.addingComment) {
			return <div>{this.renderReducerRestaurant()}</div>;
		}
		if (this.props.addingComment) {
			return <div>{this.renderPostComments()}</div>;
		}
		if (!this.props.restaurant) {
			return <div>{this.renderListRestaurant()}</div>
		}
	}

	renderPostComments(){
		return (
			<div>
				<PostComments 
					toggleCommentForm={this.toggleCommentForm} 
				/>
			</div>
		);
	}

	renderReducerRestaurant = props => {
		return (
			<div className="ui list">
				<i className="huge utensils icon"></i>
				<h2 className="ui headline">{this.props.restaurant.name}</h2>
				<h3 className="ui headline">{this.props.restaurant.address}</h3>
				<h3 className="ui headline">{this.props.restaurant.place_id}</h3>
				<div className="ui sizer vertical segment">
					<h4 className="ui medium header">Comments</h4>
					<RenderComments />
					<div className="ui list">
						<CommentButtons 
							addingComment={this.props.addingComment}
							toggleCommentForm={this.toggleCommentForm} 
							toggleRestaurantView={this.props.toggleRestaurantView}
						/>
					</div>
				</div>
			</div>
		);
	}

	renderListRestaurant = props => {
		
	}

	toggleCommentForm = (e) => {
		if (!this.props.addingComment) {
			this.props.toggleCommentForm();
		}
		if (this.props.addingComment) {
			this.props.toggleCommentForm();
		}
	}

	render(){
		console.log("RS PROPS: ", this.props);
		return (
			<div>
				<ComponentTitle addingComment={this.props.addingComment}/>
				{this.renderComponent()}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		addingComment: state.restaurant.addingComment,
		comments: state.comments,
		restaurant: state.restaurant.targetRestaurant
	}
};


export default connect(
	mapStateToProps,
	{ 
		getRestaurantComments,
		toggleCommentForm
	}
)(RestaurantShow)