import React from 'react';
import { connect } from 'react-redux';

import CommentButtons from '../comments/CommentButtons';
import ComponentTitle from '../ComponentTitle';
import PostComments from '../comments/PostComments';
import RenderComments from '../comments/RenderComments';
import { 
	getRestaurant, 
	toggleCommentForm 
} from '../../actions';

class RestaurantShow extends React.Component {

	componentDidMount(){
		this.props.getRestaurant(this.props.place_id);
	}

	renderComponent = (props, state) => {
		if (this.props.addingComment) {
			return (
				<div>
					<PostComments 
						addingComment={this.props.addingComment} 
						restaurant={this.props.restaurant} 
						toggleCommentForm={this.toggleCommentForm} 
					/>
				</div>
			)
		}
		if (this.props.rRestaurant) {
			return <div>{this.renderReducerRestaurant()}</div>
		}
		if (!this.props.rRestaurant){
			return <div>{this.renderListRestaurant()}</div>
		}
	}

	renderListRestaurant = (props) => {
		if (!this.props.rRestaurant) {
			return (
				<div>
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.restaurant.name}</h2>
					<h4 className="ui sub">NO DB ENTRY</h4>
					<CommentButtons 
						addingComment={this.props.addingComment}
						toggleCommentForm={this.toggleCommentForm}
						toggleRestaurantView={this.toggleRestaurantView} 
					/>
				</div>
			)
		}
	}

	renderReducerRestaurant = (props) => {
		if (this.props.rRestaurant){
			return (
				<div className="ui list">
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.rRestaurant.name}</h2>
					<h3 className="ui headline">{this.props.rRestaurant.address}</h3>
					<h3 className="ui headline">{this.props.rRestaurant.place_id}</h3>
					<div className="ui sizer vertical segment">
						<h4 className="ui medium header">Comments</h4>
						<RenderComments />
						<div className="ui list">
							<CommentButtons 
								addingComment={this.props.addingComment}
								toggleCommentForm={this.toggleCommentForm} 
								toggleRestaurantView={this.toggleRestaurantView}
							/>
						</div>
					</div>
				</div>
			);
		}
	}

	toggleCommentForm = props => {
		this.props.toggleCommentForm();
	}

	toggleRestaurantView = props => {
		this.props.toggleRestaurantView();
	}

	render(){
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
		rRestaurant: state.restaurant.targetRestaurant,
		rplace_id: state.restaurant.targetRestaurant.place_id
	}
};


export default connect(
	mapStateToProps,
	{ 
		getRestaurant, 
		toggleCommentForm 
	}
)(RestaurantShow)