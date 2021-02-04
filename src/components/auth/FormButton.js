import React from 'react';

class FormButton extends React.Component {
	componentDidMount(){

	}

	renderMessage = (props, message) => {
		if (!this.props.isRegistered) {
			message = 'Already Have an Account?';
			return (
				<div className="ui message">
					<div className="ui internally celled grid">
						<div className="two column row">
							<h3 className="column ui headline center aligned">{message}</h3>
							<div className="column center aligned">
								<button 
									className="ui primary button"
									onClick={this.props.toggleLogInForm}
								>
									Log In
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (this.props.isRegistered) {
			message = 'Need to Register?';
			return (
				<div className="ui message">
					<div className="ui internally celled grid">
						<div className="two column row">
							<h3 className="column ui headline center aligned">{message}</h3>
							<div className="column center aligned">
								<button 
									className="ui primary button"
									onClick={this.props.toggleRegisterForm} 
								>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}

	}
	render(){
		return (
			<div>{this.renderMessage()}</div>
		);
	}
};

export default FormButton;