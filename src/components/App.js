import React from 'react';

import Auth from './auth/Auth';
import GetCurrentLocation from './geo/GetCurrentLocation';
import RestaurantList from './restaurants/RestaurantList';
import Dashboard from './dash/Dashboard';
import AppTitle from './AppTitle';

class App extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<AppTitle/>
				<Auth />
				<Dashboard />
				<RestaurantList />
			</div>
		);
	}
}

export default App;