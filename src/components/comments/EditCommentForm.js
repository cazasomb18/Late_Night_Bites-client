import React from 'react';
import { Field, reduxForm } from 'redux-form';

class EditCommentForm extends React.Component {
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

	renderInput = ({input, label, meta, type, placeholder}) => {
		const className = `field ui header ${meta.error && meta.touched ? 'error' : ''} `;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} type={type} placeholder={placeholder} autoComplete="off"/>
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
		formValues.commentAuthor = this.props.targetComment.commentAuthor;
		formValues.restaurant_name = this.props.targetComment.restaurant_name;
		formValues.place_id = this.props.place_id;
		formValues._id = this.props.targetComment._id;
		await this.props.editComment(formValues._id);
		this.props.toggleCommentView();
	}

	render(){
		console.log(this.props);
		return (
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field 
					name="restaurant_name"
					component={this.renderReadOnlyInput}
					defaultValue={this.props.targetComment.restaurant_name}
					type="text" 
					label="Restaurant Name" 
				/>
				<Field 
					name="restaurant_id"
					component={this.renderReadOnlyInput}
					defaultValue={this.props.targetComment.restaurant_id}
					type="text"
					label="Restaurant ID"
				/>
				<Field 
					name="commentAuthor"
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.targetComment.commentAuthor}
					type="text"
					label="Author"
				/>
				<Field 
					name="commentBody"
					component={this.renderInput} 
					defaultValue={this.props.targetComment.commentBody}
					label="Comment Text"
					type="text" 
				/>
				<Field 
					name="_id"
					component={this.renderReadOnlyInput}
					defaultValue={this.props.targetComment._id}
					label="Comment ID"
					type="text"
				/>
				<button className="ui button primary" type="submit">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.commentBody){
		errors.commentBody = 'You must enter a comment'
	}
	return errors;
};

export default reduxForm({
	form: 'editCommentForm',
	validate
})(EditCommentForm);