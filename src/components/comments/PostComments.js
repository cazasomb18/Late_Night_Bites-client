import React from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import { postComment } from '../../actions';

class PostComments extends React.Component {
	componentDidMount(){
		console.log(this.props);
	}
	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	render(){
		return (
			<div>
				<h3 className="ui header">Adding Comment View</h3>
				<CommentForm 
					restaurant={this.props.restaurant} 
					postComment={this.props.postComment} 
					userName={this.props.userName} 
					userId={this.props.userId}
				/>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		userName: state.auth.userName,
		userId: state.auth.user._id
	}
};

export default connect(
	mapStateToProps,
	{ postComment }
)(PostComments)