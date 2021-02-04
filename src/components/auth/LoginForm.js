import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
	componentDidMount(){

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
				<h3 className="ui header">Please Log In</h3>
				<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field name="userName" type="text" component={this.renderInput} label="Username"/>
					<Field name="password" type="password" component={this.renderInput} label="Password" />
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
	if (!formValues.password) {
		errors.password = 'You must enter a valid password'
	}
	return errors;
};

export default reduxForm({
	form: 'loginForm',
	validate
})(LoginForm);