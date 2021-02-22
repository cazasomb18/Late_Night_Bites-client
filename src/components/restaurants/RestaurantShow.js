import React from 'react';
import { connect } from 'react-redux';

import CommentButtons from '../comments/CommentButtons';
import ComponentTitle from './ComponentTitle';
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
						restaurant={this.props.restaurant} 
						toggleCommentView={this.toggleCommentView}
					/>
				</div>
			)
		}
		if (this.props.reducerRestaurant) {
			return <div>{this.renderReducerRestaurant()}</div>
		}
		if (!this.props.reducerRestaurant){
			return <div>{this.renderListRestaurant()}</div>
		}
	}

	renderListRestaurant = (props) => {
		if (!this.props.reducerRestaurant){
			return (
				<div>
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.restaurant.name}</h2>
					<CommentButtons
						toggleCommentView={this.toggleCommentView}
						toggleRestaurantView={this.props.toggleRestaurantView} 
					/>
				</div>
			)
		}
	}

	renderReducerRestaurant = (props) => {
		if (this.props.reducerRestaurant){
			return (
				<div className="ui list">
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.reducerRestaurant.name}</h2>
					<h3 className="ui headline">{this.props.reducerRestaurant.address}</h3>
					<h3 className="ui headline">{this.props.reducerRestaurant.place_id}</h3>
					<div className="ui sizer vertical segment">
						<h4 className="ui medium header">Comments</h4>
						<RenderComments/>
						<div className="ui list">
							<CommentButtons 
								toggleCommentView={this.toggleCommentView}
								toggleRestaurantView={this.props.toggleRestaurantView}
							/>
						</div>
					</div>
				</div>
			)
		}
	}

	toggleCommentView = (props) => {
		this.props.toggleCommentForm();
	}

	render(){
		console.log(this.props);
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
		reducerRestaurant: state.restaurant.targetRestaurant
	}
};


export default connect(
	mapStateToProps,
	{ 
		getRestaurant, 
		toggleCommentForm 
	}
)(RestaurantShow)