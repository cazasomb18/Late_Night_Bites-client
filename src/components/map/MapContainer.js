import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl, { Marker } from 'mapbox-gl';

import './map.css';
import Spinner from '../geo/Spinner';

mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN;


const MapContainer = props => {
	const mapContainerRef = useRef(null);
	const restCoords = props.restaurants.resultLatLng;
	const lat = props.lat;
	const lng = props.lng;

	useEffect(()=> {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/cazasomb18/ckkskyx4e0pr017rrtd2xsqdp',
			center: [lng, lat],
			zoom: 12
		})

		new mapboxgl.Marker({
			color: "#2c4fe8",
			draggable: false
		}).setLngLat([lng, lat]).addTo(map);


		if (restCoords) {
			restCoords.map( restaurant => {
				return new mapboxgl.Marker({
					color: "#EEEEEE",
					draggable: false
				}).setLngLat([restaurant.lng, restaurant.lat]).addTo(map);
			})
		}

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


		return () => map.remove();
	}, [lat, lng, restCoords]);

	if (!props.restaurants) {
		return <Spinner message="Loading Map Data"/>
	}
	return(
		<div className=" ui container mapWrapper">
			<div className="mapContainer" ref={mapContainerRef} style={{marginTop: 20, marginBottom: 20}}/>
		</div>
	); 
};

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		restaurants: state.restaurants
	}
};

export default connect(
	mapStateToProps,
)(MapContainer);
