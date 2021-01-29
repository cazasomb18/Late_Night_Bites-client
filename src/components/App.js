import React from 'react';

import Auth from './Auth';
import GetCurrentLocation from './GetCurrentLocation';
import Header from './Header';


class App extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="ui container">
				<GetCurrentLocation />
				<Header />
				<h1>LATE NIGHT BITES</h1>
				<Auth />
			</div>
		);
	}
}

export default App;