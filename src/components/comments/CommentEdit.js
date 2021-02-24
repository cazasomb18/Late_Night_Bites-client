import React from 'react';
import { connect } from 'react-redux';

import EditCommentForm from './EditCommentForm';
import { editComment, getRestaurant } from '../../actions';
import ComponentTitle from '../ComponentTitle';

class CommentEdit extends React.Component {

	componentDidMount(){

	}

	render(){
		return (
			<div>
				<ComponentTitle editingComment={this.props.editingComment}/>
				<EditCommentForm 
					editComment={this.props.editComment}
					initialValues={{commentBody: this.props.targetComment.commentBody}}
					getRestaurant={this.props.getRestaurant}
					toggleEditCommentView={this.props.toggleEditCommentView}
				/>
				<button 
					className="ui red button"
					style={{float: "left"}}
					onClick={(e)=>{this.props.toggleEditCommentView()} }
				>EXIT</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		targetComment: state.comments.targetComment,
		place_id: state.restaurant.targetRestaurant.place_id,
		editingComment: state.comments.editingComment
	}
};

export default connect(
	mapStateToProps,
	{ editComment, getRestaurant }
)(CommentEdit);