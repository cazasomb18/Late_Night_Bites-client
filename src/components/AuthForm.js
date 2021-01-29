import React from 'react';
import { Field, reduxForm } from 'redux-form';

class AuthForm extends React.Component {
	componentDidMount(){
		// console.log(this.props);
	}

	renderError({ error, touched }) {
		if (touched && error ) {
			return (
				<div className="ui error message">
					<div className="error">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
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
		return (
			<div>
				<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field name="userName" type="text" component={this.renderInput} label="Username"/>
					<Field name="password" type="password" component={this.renderInput} label="Password" />
					<Field name="email" component={this.renderInput} label="Email" />
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);

	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.userName) {
		errors.userName = 'You must enter a user name';
	}
	if (!formValues.email) {
		errors.email = 'You must enter a valid email'
	}
	if (!formValues.password) {
		errors.password = 'You must enter a valid password'
	}
	// if (!formValues.validatePassword) {
	// 	errors.validatePassword - need validatePW as field and error handling
	// }
	return errors;
};

export default reduxForm({
	form: 'authForm',
	validate
})(AuthForm);