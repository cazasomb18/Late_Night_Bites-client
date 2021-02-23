import React from 'react';
import { connect } from 'react-redux';

import EditCommentForm from './EditCommentForm';
import { editComment } from '../../actions';

class CommentEdit extends React.Component {
	componentDidMount(){

	}

	render(){
		console.log(this.props);
		return (
			<div>
				<EditCommentForm 
					comment={this.props.comment} 
					editComment={this.props.editComment}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		comment: state.comment.targetComment
	}
};

export default connect(
	mapStateToProps,
	{ editComment }
)(CommentEdit);