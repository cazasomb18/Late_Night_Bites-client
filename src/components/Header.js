import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './dash/Dashboard';
import RestaurantList from './restaurants/RestaurantList';

import {
	getRestaurants,
	getUserRestaurantInfo,
	logOut,
	toggleDash,
	toggleRestaurantList
} from '../actions';

class Header extends React.Component {
	componentDidMount(){
		if (this.props.isLoggedIn){
			this.props.getRestaurants();
		}
	}

	onListClick = (e) => {
		this.props.toggleRestaurantList();
	}

	onDashClick = (e) => {
		this.props.toggleDash();
	}

	onLogOutClick = (e) => {
		this.props.logOut();
	}

	renderListButton(){
		if (this.props.viewingList) {
			return (
				<div
					className="ui red button"
					onClick={()=> this.onListClick()}
				>
					CLOSE LIST
				</div>
			);
		}
		if (!this.props.viewingList) {
			return (
				<div
					className="ui primary button"
				 	onClick={()=> this.onListClick()}
				>
					RESTAURANT LIST
				</div>
			);
		}
	}

	renderDashButton(){
		if (this.props.viewingDash) {
			return (
				<div 
					className="ui red button"
					onClick={()=> this.onDashClick()}
				>
					CLOSE DASH
				</div>
			);
		}
		if (!this.props.viewingDash) {
			return (
				<div 
					className="ui primary button"
					onClick={()=> this.onDashClick()}
				>
					USER DASH
				</div>
			);
		}
	}

	renderMenu(){
		if (this.props.isLoggedIn){	
			return (
				<div 
					style={{marginTop: "10px"}}
					className="ui fluid three item menu">
					<div className="item">
						{this.renderListButton()}
					</div>
					<div className="item">
						{this.renderDashButton()}
					</div>
					<div className="item">
						<button 
							className="ui red button"
							onClick={()=>this.onLogOutClick()}
						>
							SIGN OUT
						</button>
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	}

	renderComponents(){
		if (this.props.viewingList){
			return <RestaurantList/>
		}
		if (this.props.viewingDash) {
			return <Dashboard/>
		}
	}
	
	render(){
		return (
			<div>
				{this.renderMenu()}
				<div>
					{this.renderComponents()}
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		viewingList: state.restaurants.viewingList,
		viewingDash: state.auth.viewingDash,
		isLoggedIn: state.auth.isLoggedIn,
	}
}

export default connect(
	mapStateToProps,
	{
		getRestaurants,
		getUserRestaurantInfo,
		logOut,
		toggleDash,
		toggleRestaurantList
	}
)(Header);