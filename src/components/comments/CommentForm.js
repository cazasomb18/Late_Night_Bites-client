import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
	componentDidMount(){
		console.log(this.props.restaurant);

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

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	}

	render(){
		return(
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<label className="ui header">Name</label>
				<input readOnly name="name" value={this.props.restaurant.name}></input>
				<label className="ui header">Address</label>
				<input readOnly name="address" value={this.props.restaurant.vicinity}></input>
				<label className="ui header">Id</label>
				<input readOnly name="place_id" value={this.props.restaurant.place_id}></input>
				<Field name="commentInput" type="text" component={this.renderInput} label="Comment"/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.commentInput) {
		errors.commentInput = 'You must enter a comment'
	}
	return errors;
};

export default reduxForm({
	form: 'commentForm',
	validate
})(CommentForm);
