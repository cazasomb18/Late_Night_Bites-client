import React from 'react';
import { connect } from 'react-redux';

import Spinner from './Spinner';
import { getCoords } from '../../actions';

class GetCurrentLocation extends React.Component {

	componentDidMount(){
		this.props.getCoords();
	}

	renderLocation() {
		if (this.props.errorMessage && !this.props.lat && !this.props.lng) {
			return <div>Error: {this.props.errorMessage}</div>
		}
		if (!this.props.errorMessage && this.props.lat && this.props.lng) {
			return;
		}
		return <Spinner message={"Finding GPS position..."} />
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
		errorMessage: state.coords.errorMessage
	}
};

export default connect( 
	mapStateToProps, 
	{ getCoords }
)(GetCurrentLocation);