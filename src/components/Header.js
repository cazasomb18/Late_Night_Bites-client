import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
	
	componentDidMount(){
		
	}
	render(){
		return (
			<div>
				<h1 className="ui headline">Late Night Bites</h1>
				<div className="ui secondary menu">
					<button className='item'>
						Register
					</button>
					<button className='item end'>
						Login
					</button>
				</div>
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