import React from 'react';

import Auth from './auth/Auth';
import GetCurrentLocation from './geo/GetCurrentLocation';
// import Header from './Header';
import RestaurantList from './restaurants/RestaurantList';
import MapContainer from './map/MapContainer';


class App extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<Auth />
				<RestaurantList />
				<MapContainer />
			</div>
		);
	}
}

export default App;