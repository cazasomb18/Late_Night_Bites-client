import React from 'react';

import CommentForm from './CommentForm';

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
				<CommentForm restaurant={this.props.restaurant}/>
			</div>
		);
	}
};

export default PostComments;