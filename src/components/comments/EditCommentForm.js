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
				<input type={type} placeholder={placeholder}/>
			</div>
		);
	}

	onSubmit = (formValues) => {
		console.log(formValues);
	}

	render(){
		console.log(this.props);
		return (
			<div className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field 
					name="commentBody" 
					component={this.renderInput} 
					type="text" 
					label="Comment"
					placeHolder={this.props.comment.commentBody}
				/>
			</div>
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