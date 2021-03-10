import React from 'react';

import Auth from './auth/Auth';
import GetCurrentLocation from './geo/GetCurrentLocation';
import AppTitle from './AppTitle';
import RenderMap from './map/RenderMap';
import Header from './Header';

class App extends React.Component {
	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<AppTitle />
				<Auth />
				<Header />
				<RenderMap />
			</div>
		);
	}
}

export default App;