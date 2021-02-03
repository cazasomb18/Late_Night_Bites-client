import React from 'react';

import Auth from './Auth';
import GetCurrentLocation from './GetCurrentLocation';
import Header from './Header';
import RestaurantList from './RestaurantList';


class App extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<Header />
				<h1>Late Night Bites</h1>
				<Auth />
				<RestaurantList/>
			</div>
		);
	}
}

export default App;