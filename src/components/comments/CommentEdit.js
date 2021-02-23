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
					place_id={this.props.place_id}
					editComment={this.props.editComment}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state,
		comment: state.comment.targetComment,
		place_id: state.restaurant.targetRestaurant.place_id
	}
};

export default connect(
	mapStateToProps,
	{ editComment }
)(CommentEdit);