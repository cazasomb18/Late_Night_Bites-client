import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
	componentDidMount(){

	}

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="error">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type }) => {
		const className = `field ui header ${meta.error && meta.touched ? 'error': ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} placeholder={label} type={type} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	}

	renderReadOnlyInput = ({ label, type, defaultValue }) => {
		const className = "field ui header";
		return (
			<div className={className}>
				<label>{label}</label>
				<input type={type} readOnly defaultValue={defaultValue}/>
			</div>
		);
	}

	onSubmit = async (formValues) => {
		formValues.commentAuthor = this.props.userName;
		formValues.restaurant_name = this.props.restaurant.name;
		formValues.name = this.props.restaurant.name;
		formValues.address = this.props.restaurant.address;
		formValues.place_id = this.props.restaurant.place_id;
		await this.props.postComment(formValues);
		await this.props.getRestaurantComments();
		this.props.toggleCommentForm();
	}

	render(){
		return(
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field 
					name="name" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.name} 
					type="text" 
					label="Restaurant Name"
				/>
				<Field 
					name="address" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.address}
					type="text" 
					label="Address"
				/>
				<Field 
					name="place_id" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.place_id} 
					type="text" 
					label="Place Id"
				/>
				<Field 
					name="commentBody" 
					component={this.renderInput} 
					type="text" 
					label="Comment"
				/>
				<Field 
					name="commentAuthor" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.userName} 
					type="text" 
					label="Author" 
				/>
				<button className="ui button primary" type="submit">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.commentBody) {
		errors.commentBody = 'You must enter a comment'
	}
	return errors;
};

export default reduxForm({
	form: 'commentForm',
	validate
})(CommentForm);