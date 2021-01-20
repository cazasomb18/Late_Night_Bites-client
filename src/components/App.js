import React from 'react';

import Spinner from './Spinner';


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			lat: null,
			lng: null,
			errorMessage: ''
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(location => {
			this.setState({
				lat: location.coords.latitude, 
				lng: location.coords.longitude
			});
		});
	}

	renderLocation() {
		if (this.state.errorMessage && !this.state.lat && !this.state.lng) {
			this.setState({errorMessage: "Navigator experienced an error finding you locaiton"})
			return <div>Error: {this.state.errorMessage}</div>
		}

		if (!this.state.errorMessage && this.state.lat && this.state.lng) {
			return <div>App</div>;
		}

		return <Spinner message={"Please Accept Location Request"} />
	}

	render() {
		return (
			<div className="ui container">
				{this.renderLocation()}
			</div>
		);
	}
}

export default App;