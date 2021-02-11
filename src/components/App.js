import React from 'react';

import Auth from './auth/Auth';
import GetCurrentLocation from './geo/GetCurrentLocation';
import RestaurantList from './restaurants/RestaurantList';


class App extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<Auth />
				<RestaurantList />
			</div>
		);
	}
}

export default App;