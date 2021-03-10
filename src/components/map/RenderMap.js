import React from 'react';
import { connect } from 'react-redux';

import MapContainer from './MapContainer';

class RenderMap extends React.Component {
	renderMap(){
		if (this.props.isLoggedIn){
			return <div><MapContainer/></div>;
		}
		else {
			return null;
		}
	}
	render(){
		return <div>{this.renderMap()}</div>
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn
	}
}

export default connect(mapStateToProps)(RenderMap)