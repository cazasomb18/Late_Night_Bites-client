import React from 'react';
import { connect } from 'react-redux';

import PostComments from '../comments/PostComments';
import { showRestaurantComments, getRestaurant } from '../../actions';

class RestaurantShow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addingComment: false,
			targetRestaurant: null
		}
	}
	componentDidMount(){
		this.props.getRestaurant(this.props.place_id);
	}

	renderComponent = (props, state) => {
		if (this.state.addingComment === true) {
			return (
				<div>
					<PostComments 
						restaurant={this.state.targetRestaurant} 
						toggleCommentView={this.toggleCommentView}
					/>
				</div>
			)
		}
		if (this.props.reducerRestaurant) {
			return (
				<div className="ui list">
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.reducerRestaurant.name}</h2>
					<h3 className="ui headline">{this.props.reducerRestaurant.address}</h3>
					<div className="ui sizer vertical segment">
						<h4 className="ui medium header">Comments</h4>
						<div className="ui list">
							{this.renderComments()}
						</div>
					</div>
					<button
						style={{float: "right"}} 
						className="ui red button" 
						onClick={this.props.toggleRestaurantView}
					>Exit
					</button>
				</div>
			)
		}
		if (!this.props.reducerRestaurant){
			return (
				<div>
					<i className="huge utensils icon"></i>
					<h2 className="ui headline">{this.props.restaurant.name}</h2>
					{this.renderComments()}
					<button
						style={{float: "right"}} 
						className="ui red button" 
						onClick={this.props.toggleRestaurantView}
					>Exit to List
					</button>
				</div>
			);
		}
	}

	renderComments = (props)=> {
		if (this.props.reducerRestaurant){
			if (this.props.comments.length > 1) {

				return<div>COMMENTS GREATER THAN 1</div>;
			}
			if (!this.props.comments) {
				return (
					<div>
						<h4 className="semantic ui headline">NO COMMENTS FOUND</h4>
						<button 
							className="button-item ui primary button content" 
							onClick={this.toggleCommentView} 
						>Add Comment
						</button>
					</div>
				)
			}
			if (this.props.comments.length === 1) {
				return (
					<div className="ui celled list">
						<h5 className="ui headline">{this.props.comments[0].commentBody}</h5>
						<h5 className="ui headline">by: {this.props.comments[0].commentAuthor}</h5>
					</div>
				)
			}
		} else {
			return <div>NO MONGO DB ENTRY FOR THIS RESTAURANT</div>;
		}
	}

	toggleCommentView = () => {
		if (!this.state.addingComment){
			this.setState({
				addingComment: true,
				targetRestaurant: this.props.restaurant
			})
		};
		if (this.state.addingComment){
			this.setState({
				addingComment: false,
				targetRestaurant: null
			})
		};
	}

	renderForm = () => {

	}

	render(){
		console.log(this.props);
		console.log(this.state);
		return (
			<div>
				<h2 className="ui header">Restaurant Show</h2>
				{this.renderComponent()}
			</div>
		); 
	}

};

const mapStateToProps = state => {
	return {
		reducerRestaurant: state.restaurant.targetRestaurant,
		comments: state.restaurant.comments
	}
};


export default connect(
	mapStateToProps,
	{ showRestaurantComments, getRestaurant }
)(RestaurantShow)