import React from 'react';
import { connect } from 'react-redux';

import PostComments from '../comments/PostComments';
import CommentButton from '../comments/CommentButton';
import ComponentTitle from './ComponentTitle';
import { 
	showRestaurantComments, 
	getRestaurant, 
	toggleCommentForm 
} from '../../actions';

class RestaurantShow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addingComment: false,
			targetRestaurant: null
		}
	}
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
		if (this.props.reducerRestaurant && !this.props.addingComment) {
			return (
				<div className="ui list">
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.reducerRestaurant.name}</h2>
					<h3 className="ui headline">{this.props.reducerRestaurant.address}</h3>
					<h3 className="ui headline">{this.props.reducerRestaurant.place_id}</h3>
					<div className="ui sizer vertical segment">
						<h4 className="ui medium header">Comments</h4>
						<div className="ui list">
							{this.renderComments()}
						</div>
					</div>
					<button
						style={{float: "right"}} 
						className="ui red button" 
						onClick={this.props.toggleRestaurantView}
					>Exit
					</button>
				</div>
			)
		}
		if (!this.props.reducerRestaurant && !this.props.addingComment){
			return (
				<div>
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.restaurant.name}</h2>
					{this.renderComments()}
					<button
						style={{float: "right"}} 
						className="ui red button" 
						onClick={this.props.toggleRestaurantView}
					>Exit to List
					</button>
				</div>
			);
		}
	}

	renderComments = (props)=> {
		if (!this.props.reducerRestaurant){
			return(
				<div>
					<h4 className="semantic ui headline">NO MONGO DB ENTRY FOR THIS RESTAURANT</h4>
					<CommentButton
						toggleCommentView={this.toggleCommentView}
					/>
				</div>
			) 
		};
		if (this.props.reducerRestaurant){

			this.props.showRestaurantComments();

			if (this.props.comments.length > 1) {
				return<div>COMMENTS GREATER THAN 1</div>;
			};
			if (!this.props.comments) {
				return (
					<div>
						<h4 className="semantic ui headline">NO COMMENTS FOUND</h4>
						<CommentButton
							toggleCommentView={this.toggleCommentView}
						/>
					</div>
				)
			};
		};
	}

	toggleCommentView = (props) => {
		this.props.toggleCommentForm();
	}

	render(){
		return (
			<div>
				<h1 className="ui header">Restaurant Show</h1>
				{this.renderComponent()}
			</div>
		); 
	}

};

const mapStateToProps = state => {
	return {
		addingComment: state.restaurant.addingComment,
		comments: state.restaurant.comments,
		reducerRestaurant: state.restaurant.targetRestaurant
	}
};


export default connect(
	mapStateToProps,
	{ 
		showRestaurantComments, 
		getRestaurant, 
		toggleCommentForm 
	}
)(RestaurantShow)