import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CommentForm from './CommentForm';
import { postComment } from '../../actions';

class PostComments extends React.Component {
	componentDidMount(){

	}
	render(){
		return (
			<div>
				<CommentForm 
					initialValues={{
						name: _.pick(this.props.restaurant, 'name'),
						address: _.pick(this.props.restaurant, 'vicinity') + ',' + this.props.restaurant.plus_code.compound_code.split(',')[1].split(),
						place_id: _.pick(this.props.restaurant, 'place_id'),
						commentAuthor: this.props.userName
					}}
					restaurant={this.props.restaurant} 
					postComment={this.props.postComment} 
					userName={this.props.userName} 
					userId={this.props.userId} 
					toggleCommentForm={this.props.toggleCommentForm}
				/>
				<button 
					style={{float: "right"}}
					className="ui red button"
					onClick={this.props.toggleCommentForm} 
				>Exit
				</button>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		addingComment: state.restaurant.addingComment,
		userName: state.auth.userName,
		userId: state.auth.user._id
	}
};

export default connect(
	mapStateToProps,
	{ postComment }
)(PostComments)