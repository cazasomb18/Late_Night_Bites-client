import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';

import { getCoords, getRestaurants } from '../../actions';
import '../../map.css';

mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN;


const MapContainer = () => {
	const mapContainerRef = useRef(null);

	useEffect(()=> {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/cazasomb18/ckkron2px0exb17o1uksirgu5',
			center: [-87.68685339999999, 41.9735698],
			zoom: 12
		})

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


		return () => map.remove();
	}, []);

	return(
		<div className="mapWrapper">
			<div className="mapContainer" ref={mapContainerRef} />
		</div>
	); 
};

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		restaurants: state.restaurants.data.results
	}
};

export default connect(
	mapStateToProps,
	{ getCoords, getRestaurants }
)(MapContainer);