import React from 'react';
import { connect } from 'react-redux';

import { getRestaurantComments } from '../../actions';


class RenderComments extends React.Component {

	componentDidMount(){
		if (this.props.restaurant) {
			this.props.getRestaurantComments();
		}
	}

	renderComments = (props) => {
		return this.props.comments.map(( comment, i) => {
			return (
				<div className="item" key={comment._id}>
					<div className="content">
						<div className="description">
							<p>{comment.commentBody}</p>
							<p>by: {comment.commentAuthor}</p>
							<button 
								className="ui red button"
							>DELETE</button>
						</div>
					</div>
				</div>
			);
		})
	}

	deleteComments = (props) => {
		
	}

	editComments = (props) => {

	}

	render(){
		console.log("props :\n", this.props);
		return <div>{this.renderComments()}</div>
	}
};

const mapStateToProps = (state) => {
	return {
		comments: state.comments.list,
		restaurant: state.restaurant.targetRestaurant
	}
};

export default connect(
	mapStateToProps,
	{ getRestaurantComments }
)(RenderComments);