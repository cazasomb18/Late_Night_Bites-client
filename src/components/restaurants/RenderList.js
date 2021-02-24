import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MapContainer from '../map/MapContainer';
import { 
	getRestaurants, 
	toggleRestaurantView, 
	getRestaurant 
} from '../../actions';
import Spinner from '../geo/Spinner';
import RestaurantShow from './RestaurantShow';
import './restaurants.css';

class RenderList extends React.Component {
	
	componentDidMount(){
		this.props.getRestaurants();
	}

	renderList = (props) => {
		if (this.props.restaurants) {
			return this.props.restaurants.map( (restaurant, i) => {
				const address = restaurant.vicinity + ", " + restaurant.plus_code.compound_code.split(',')[1].split();
				const dollarIcons = _(restaurant.price_level).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(Math.floor(restaurant.rating)).times(i => <i className="star outline icon" key={i}></i>);
				const place_id = restaurant.place_id;
				if (restaurant.business_status === "OPERATIONAL") {
					return (
						<div className="item" key={place_id}>
							<h3>{restaurant.name}</h3>
							<div className="content">
								<h5 className="ui header">{address}</h5>
								<h5 className="sub header">{place_id}</h5>
								<div className="ui label content">
									<h5 className="ui sub">Rating: {starsIcons}</h5>
									<h5 className="ui sub">Price: {dollarIcons}</h5>
									<h5 className="ui sub">Total reviews: {restaurant.user_ratings_total}</h5>
								</div>
								<div className="buttoncontainer">
									<button 
										place_id={place_id}
										className="button-item ui primary button content"
										onClick={ async e => {
											await this.props.getRestaurant(place_id);
											this.toggleRestaurantView();
										}}
									>RESTAURANT SHOW</button>
								</div>
							</div>
						</div>
					);
				}
				return null;
			})
		} 
		return <Spinner message="Finding Late Night Bites..."/>;
	}

	toggleRestaurantView = () => {
		if (!this.props.viewingRestaurant){
			this.props.toggleRestaurantView();
		}
		if (this.props.viewingRestaurant) {
			this.props.toggleRestaurantView();
		}
	}

	renderComponent = () => {
		if (this.props.viewingRestaurant) {
			return (
				<div>
					<RestaurantShow
						place_id={this.props.targetRestaurant.place_id}
						toggleRestaurantView={this.toggleRestaurantView} 
					/>
				</div>
			);
		}
		if (!this.props.viewingRestaurant) {
			return (
				<div>
					<h1 className="ui header">Restaurant List</h1>
					<div className="ui list">
						{this.renderList()}
					</div>
					<MapContainer/>
				</div>
			); 
		}
	}

	render(){
		return <div>{this.renderComponent()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		restaurants: state.restaurants.list.results,
		targetRestaurant: state.restaurant.targetRestaurant,
		user: state.auth.user,
		viewingRestaurant: state.restaurants.viewingRestaurant
	}	
}

export default connect(
	mapStateToProps,
	{ 
		getRestaurant,
		getRestaurants, 
		toggleRestaurantView
	}
 )(RenderList);