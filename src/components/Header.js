import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
	
	componentDidMount(){
		
	}
	render(){
		return (
			<div className="ui secondary pointing menu">
				<button className='item'>
					Register
				</button>
				<button className='item end'>
					Login
				</button>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		isRegistered: state.auth.isRegistered,
		userName: state.auth.userName
	}
}

export default connect(
	mapStateToProps
)(Header);