import React from 'react';
import { connect } from 'react-redux';

import { logIn, logOut, registerUser } from '../actions';
import AuthForm from './AuthForm';


class Auth extends React.Component {

	componentDidMount(){
		console.log("STATE: ", this.state);
		console.log("PROPS: ", this.props);
	}

	renderForm(){
		if (!this.props.isRegistered && !this.props.isLoggedIn && !this.props.userName) {
			return(
				<div>
					<h3>Please Register</h3>
					<AuthForm onSubmit={()=>{this.onRegisterClick(this.state.formValues)}}/>

				</div>
			); 
		}
		if (this.props.isRegistered && !this.props.isLoggedIn && this.props.userName) {
			return(
				<div>
					<h3>Please Log In</h3>
					<AuthForm onSubmit={this.onLogInClick(this.state.values)}/>
				</div>
			);
		}
		if (this.props.isRegistered && this.props.isLoggedIn && this.props.userName) {
			return <div>{this.renderLogOutButton()}</div>;
		}

	}

	onLogInClick = formValues => {
		logIn(formValues);
	}

	onLogOutClick = () => {
		logOut();
	}

	onRegisterClick = formValues => {
		registerUser(formValues);
	}

	renderLogOutButton = () => {
		if (this.props.isSignedIn === true) {
			return (
				<button
					onClick={this.onLogOutClick} 
					className="ui red button"
				>
					Sign Out
				</button>
			);
		}
	}

	render(){
		// console.log(this.props)
		return <div>{this.renderForm()}</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	
	return { userName: state.auth.userName };
};


export default connect(
	mapStateToProps,
	{ logIn, logOut, registerUser }
)(Auth);