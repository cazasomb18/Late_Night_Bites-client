import React from 'react';
import { connect } from 'react-redux';

import { 
	getRestaurantComments, 
	getComment, 
	deleteComment, 
	toggleEditCommentView 
} from '../../actions';
import CommentEdit from './CommentEdit';


class RenderComments extends React.Component {

	componentDidMount(){

	}

	renderComments = (props) => {
		if (this.props.comments.length > 0) {
			return this.props.comments.map((comment, index) => {
				const id = comment._id;
				return (
					<div className="item" key={comment._id}>
						<div className="content">
							<div className="description">
								<h4>{index+1}</h4>
								<h5 className="ui sub">{comment.commentBody}</h5>
								<h5 className="ui sub">by: {comment.commentAuthor}</h5>
								<h5 className="ui sub">comment_id: {id}</h5>
								<button 
									id={comment._id}
									className="ui red button"
									onClick={ async (e) =>  {
										await this.deleteComment(id);
										this.props.getRestaurantComments();
									}}
								>DELETE</button>
								<button
									id={comment._id}
									className="ui primary button"
									onClick={ async (e) => {
										await this.props.getComment(id);
										this.toggleEditCommentView();
									}}
								>EDIT</button>
							</div>
						</div>
					</div>
				);
			})
		}
		if (this.props.comments.length === 0) {
			return (
				<div>
					<h3 className={"ui headline"}>NO COMMENTS FOUND</h3>
				</div>
			);
		}
	}

	renderComponent = (props) => {
		if (this.props.editingComment) {
			return <div>{this.renderEditForm()}</div>;
		}
		if (!this.props.editingComment) {
			return <div>{this.renderComments()}</div>;
		}
	}

	toggleEditCommentView = (e) => {
		this.props.toggleEditCommentView();
	}

	renderEditForm = (props) => {
		return (
			<div>
				<CommentEdit 
					toggleEditCommentView={this.toggleEditCommentView}
				/>
			</div>
		);
	}

	deleteComment = (id) => {
		this.props.deleteComment(id);
	}

	render(){
		return <div>{this.renderComponent()}</div>
	}
};

const mapStateToProps = (state) => {
	return {
		comments: state.comments.list,
		editingComment: state.comments.editingComment,
		restaurant: state.restaurant.targetRestaurant,
		ids: Object.keys(state.comments.ids),
		place_id: state.restaurant.targetRestaurant.place_id
	}
};

export default connect(
	mapStateToProps,
	{ 
		toggleEditCommentView,
		deleteComment, 
		getComment, 
		getRestaurantComments, 
	}
)(RenderComments);