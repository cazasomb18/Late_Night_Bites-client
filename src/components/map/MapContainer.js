import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl, { Marker } from 'mapbox-gl';

// import { getCoords, getRestaurants } from '../../actions';
import '../../map.css';

mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN;


const MapContainer = props => {
	const mapContainerRef = useRef(null);

	useEffect(()=> {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/cazasomb18/ckkskyx4e0pr017rrtd2xsqdp',
			center: [props.lng, props.lat],
			zoom: 12
		})

		new mapboxgl.Marker({
			color: "#2c4fe8",
			draggable: false
		}).setLngLat([props.lng, props.lat]).addTo(map);

		props.restaurants.resultLatLng.map( restaurant => {
			return new mapboxgl.Marker({
				color: "#EEEEEE",
				draggable: false
			}).setLngLat([restaurant.lng, restaurant.lat]).addTo(map);
		})

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


		return () => map.remove();
	}, [props.lat, props.lng, props.restaurants, props.getRestaurants]);

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
