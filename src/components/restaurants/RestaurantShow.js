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

class RestaurantShow extends React.Component {

	componentDidMount() {
		if (this.props.restaurant) {
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
		if (!this.props.restaurant.comments) {
			return <div>{this.renderListRestaurant()}</div>;
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

	renderComments = () => {
		if (this.props.restaurant.comments) {
			return (
				<div>
					<RenderComments/>
				</div>
			);
		}
		if (!this.props.restaurant.comments) {
			return (
				<div>
					<h3 className="ui headline">NO COMMENTS FOUND!</h3>	
				</div>
			);
		}
	}

	renderReducerRestaurant = props => {
		return (
			<div className="ui list">
				<h3 className="ui medium header">{this.props.restaurant.name}</h3>
				<h4 className="ui sub">{this.props.restaurant.address}</h4>
				<h4 className="ui sub">{this.props.restaurant.place_id}</h4>
				<div className="ui sizer vertical segment">
					<h4 className="ui medium header">Comments</h4>
					{this.renderComments()}
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
		return (
			<div>
				<h3 className="ui headline">RESTAURANT NOT IN MONGODB!</h3>
			</div>
		);
	}

	toggleCommentForm = (e) => {
		this.props.toggleCommentForm();
	}

	render(){
		return (
			<div>
				<ComponentTitle 
					addingComment={this.props.addingComment} 
					viewingRestaurant={this.props.viewingRestaurant}
				/>
				{this.renderComponent()}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		addingComment: state.restaurant.addingComment,
		comments: state.comments,
		restaurant: state.restaurant.targetRestaurant,
		viewingRestaurant: state.restaurants.viewingRestaurant

	}
};


export default connect(
	mapStateToProps,
	{ 
		getRestaurantComments,
		toggleCommentForm
	}
)(RestaurantShow)