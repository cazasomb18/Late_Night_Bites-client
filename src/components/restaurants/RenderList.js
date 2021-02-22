import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MapContainer from '../map/MapContainer';
import { getRestaurants, toggleRestaurantView, getRestaurant } from '../../actions';
import Spinner from '../geo/Spinner';
import RestaurantShow from './RestaurantShow';
import './restaurants.css';

class RenderList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			viewingRestaurant: false,
			targetRestaurant: null
		}
	}

	componentDidMount(){
		this.props.getRestaurants();
	}

	renderList = (props) => {
		if (this.props.restaurants) {
			return this.props.restaurants.map( (restaurant, index) => {
				const address = restaurant.vicinity + ", " + restaurant.plus_code.compound_code.split(',')[1].split();
				const photoReference = restaurant.photos[0].photo_reference;
				const dollarIcons = _(restaurant.price_level).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(Math.floor(restaurant.rating)).times(i => <i className="star outline icon" key={i}></i>);
				if (restaurant.business_status === "OPERATIONAL") {
					return (
						<div className="item" key={restaurant.place_id}>
							<h3>{restaurant.name}</h3>
							<div className="content">
								<h5 className="ui header">{address}</h5>
								<div className="ui label content">
									<h5>Rating: {starsIcons}</h5>
									<h5>Price: {dollarIcons}</h5>
									<h5>Total reviews: {restaurant.user_ratings_total}</h5>
								</div>
								<div className="buttoncontainer">
									<button
										className="button-item ui primary button content"
										onClick={this.toggleRestaurantView}
										id={index}
									>RESTAURANT SHOW</button>
								</div>
							</div>
						</div>
					);
				}
				return null;
			})
		} 
		return <Spinner message="Finding Late Night Bites"/>;
	}

	toggleRestaurantView = async (e, id) => {
		if (!this.state.viewingRestaurant){
			this.setState({
				viewingRestaurant: true,
				targetRestaurant: this.props.restaurants[e.currentTarget.id]
			})
		}
		if (this.state.viewingRestaurant) {
			this.setState({
				viewingRestaurant: false,
				targetRestaurant: null
			})
		}
	}

	toggleRestaurantShow = async (e, id, place_id) => {
		const restaurant = await this.props.getRestaurant(place_id);
		if (restaurant) {	
			this.props.toggleRestaurantView();
		}
		if (this.props.viewingRestaurant){
			this.setState({
				targetRestaurant: this.props.restaurants[e.currentTarget.id]
			})
		}
		if (!this.props.viewingRestaurant){
			this.props.toggleRestaurantView();
			this.setState({
				targetRestaurant: null
			})
		}
	}

	renderComponent = () => {
		if (this.state.viewingRestaurant) {
			return (
				<div>
					<RestaurantShow
						place_id={this.state.targetRestaurant.place_id}
						restaurant={this.state.targetRestaurant}
						toggleRestaurantView={this.toggleRestaurantView}
					/>
				</div>
			);
		}
		if (!this.state.viewingRestaurant){
			return (
				<div>
					<h1 className="ui header">Restaurant List</h1>
					<div className="ui list">
						{this.renderList()}
					</div>
					<MapContainer/>
				</div>
			) 
		}
	}

	render(){
		return <div>{this.renderComponent()}</div>
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
};

export default connect(
	mapStateToProps,
	{ getRestaurants, toggleRestaurantView, getRestaurant }
 )(RenderList);