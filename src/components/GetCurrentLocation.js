import React from 'react';
import { connect } from 'react-redux';

import Spinner from './Spinner';
import { getCoords } from '../actions';

class GetCurrentLocation extends React.Component {

	componentDidMount(){
		this.props.getCoords();
	}

	renderLocation() {
		if (this.props.errorMessage && !this.props.coords.lat && !this.props.coords.lng) {
			return <div>Error: {this.props.coords.errorMessage}</div>
		}
		if (!this.props.errorMessage && this.props.lat && this.props.lng) {
			// console.log("Latitude: " + this.props.lat + "\nLongitude: " + this.props.lng);
			return;
		}
		return <Spinner message={"Please Accept Location Request"} />
	}

	render(){
		return (
			<div>
				{this.renderLocation()}
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		errorMessage: ''
	}
};

export default connect( mapStateToProps, { getCoords })(GetCurrentLocation);