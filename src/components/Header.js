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
		this.props.getRestaurants();
		this.props.getUserRestaurantInfo();
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
				<div>
					<button
						className='ui red button'
						onClick={()=> this.onListClick()}
					>
						CLOSE LIST
					</button>
				</div>
			);
		}
		if (!this.props.viewingList) {
			return (
				<div>
					<button
					 	className='ui primary button'
					 	onClick={()=> this.onListClick()}
					>
						RESTAURANT LIST
					</button>
				</div>
			);
		}
	}

	renderDashButton(){
		if (this.props.viewingDash) {
			return (
				<div>
					<button
						className="ui red button"
						onClick={()=> this.onDashClick()}
					>
						CLOSE DASH
					</button>
				</div>
			);
		}
		if (!this.props.viewingDash) {
			return (
				<div>
					<button
						className="ui primary button"
						onClick={()=> this.onDashClick()}
					>
						DASHBOARD
					</button>
				</div>
			);
		}
	}

	renderMenu(){
		if (this.props.isLoggedIn){	
			return (
				<div 
					style={{marginTop: '10px', marginBottom: '10px'}} 
					className="ui three column grid">
					<div className="column">
						{this.renderListButton()}
					</div>
					<div className="column">
						{this.renderDashButton()}
					</div>
					<div className="column">
						<button
							className=" ui red button" 
							onClick={()=> this.onLogOutClick()}
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