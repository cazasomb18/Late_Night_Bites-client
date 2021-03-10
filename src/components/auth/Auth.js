import React from 'react';
import { connect } from 'react-redux';

import { 
	logIn, 
	logOut,
	registerUser, 
	toggleRegisterForm, 
	toggleLogInForm
} from '../../actions';
import AuthForm from './AuthForm';
import LoginForm from './LoginForm';
import FormButton from './FormButton';


class Auth extends React.Component {

	componentDidMount(){

	}

	renderForm(){
		if (!this.props.isRegistered) {
			return(
				<div>{this.renderRegisterForm()}</div>
			);
		}
		if (this.props.isRegistered && !this.props.isLoggedIn) {
			return <div>{this.renderLogInForm()}</div>;
		}
		// if (this.props.isRegistered && this.props.isLoggedIn) {
		// 	return <div>{this.renderLogOutButton()}</div>;
		// }

	}

	onLogInClick = formValues => {
		this.props.logIn(formValues);
	}

	// onLogOutClick = () => {
	// 	this.props.logOut();
	// }

	onRegisterClick = formValues => {
		this.props.registerUser(formValues);
	}

	// renderLogOutButton = (props) => {
	// 	if (this.props.isLoggedIn) {
	// 		return (
	// 			<button
	// 				style={{float: "right"}}
	// 				onClick={this.onLogOutClick} 
	// 				className="ui red button"
	// 			>
	// 				Sign Out
	// 			</button>
	// 		);
	// 	}
	// }

	renderLogInForm = (props) => {
		if (this.props.isRegistered) {
			return (
				<div>
					<LoginForm onSubmit={this.onLogInClick}/>
					<FormButton 
						isRegistered={this.props.isRegistered} 
						toggleRegisterForm={this.props.toggleRegisterForm} 
					/>
				</div>
			);
		}
	}

	renderRegisterForm = (props) => {
		if (!this.props.isRegistered) {
			return (
				<div>
					<AuthForm onSubmit={this.onRegisterClick}/>
					<FormButton 
						isRegistered={this.props.isRegistered} 
						toggleLogInForm={this.props.toggleLogInForm}
					/>
				</div>
			);
		}
	}

	render(){
		return <div>{this.renderForm()}</div>
	}
}

const mapStateToProps = state => {
	
	return {
		isLoggedIn: state.auth.isLoggedIn,
		isRegistered: state.auth.isRegistered,
		userName: state.auth.userName
	};
};


export default connect(
	mapStateToProps,
	{ 
		logIn,
		logOut,
		registerUser,
		toggleRegisterForm,
		toggleLogInForm
	}
)(Auth);