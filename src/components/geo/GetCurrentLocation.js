import React from 'react';
import { connect } from 'react-redux';

import Spinner from './Spinner';
import { getCoords } from '../../actions';

class GetCurrentLocation extends React.Component {

	componentDidMount(){
		if (window.navigator.geolocation) {
			this.props.getCoords();
		}
	}

	renderLocation() {
		if (this.props.errorMessage && !this.props.coords.lat && !this.props.coords.lng) {
			return <div>Error: {this.props.coords.errorMessage}</div>
		}
		if (!this.props.errorMessage && this.props.lat && this.props.lng) {
			return;
		}
		return <Spinner message={this.props.errorMessage} />
	}

	render(){
		console.log(this.props)
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
		errorMessage: state.coords.errorMessage
	}
};

export default connect( 
	mapStateToProps, 
	{ getCoords }
)(GetCurrentLocation);