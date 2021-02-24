import React from 'react';
import { connect } from 'react-redux';

import EditCommentForm from './EditCommentForm';
import { editComment } from '../../actions';

class CommentEdit extends React.Component {

	componentDidMount(){

	}

	render(){
		return (
			<div>
				<EditCommentForm 
					initialValues={{commentBody: this.props.targetComment.commentBody}}
					editComment={this.props.editComment}
					targetComment={this.props.targetComment}
					toggleEditCommentView={this.props.toggleEditCommentView}
				/>
				<button 
					className="ui red button"
					style={{float: "right"}}
					onClick={(e)=>{this.props.toggleEditCommentView()} }
				>EXIT</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		targetComment: state.comments.targetComment,
	}
};

export default connect(
	mapStateToProps,
	{ editComment }
)(CommentEdit);