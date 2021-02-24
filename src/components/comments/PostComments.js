import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CommentForm from './CommentForm';
import { postComment, toggleCommentForm, getRestaurantComments } from '../../actions';

class PostComments extends React.Component {
	componentDidMount(){

	}

	toggleCommentForm = (e) => {
		this.props.toggleCommentForm()
	}

	render(){
		return (
			<div>
				<CommentForm 
					initialValues={{
						name: _.pick(this.props.restaurant, 'name'),
						address: _.pick(this.props.restaurant, 'address'),
						place_id: _.pick(this.props.restaurant, 'place_id'),
						commentAuthor: this.props.userName
					}}
					restaurant={this.props.restaurant} 
					postComment={this.props.postComment} 
					userName={this.props.userName} 
					userId={this.props.userId} 
					toggleCommentForm={this.toggleCommentForm}
					getRestaurantComments={this.props.getRestaurantComments}
				/>
				<button 
					style={{float: "right"}}
					className="ui red button"
					onClick={this.toggleCommentForm} 
				>Exit
				</button>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		restaurant: state.restaurant.targetRestaurant,
		userName: state.auth.userName,
		userId: state.auth.user._id
	}
};

export default connect(
	mapStateToProps,
	{ 
		postComment,
		toggleCommentForm,
		getRestaurantComments
	 }
)(PostComments)