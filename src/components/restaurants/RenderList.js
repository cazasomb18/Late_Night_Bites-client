import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getRestaurants, getCoords } from '../../actions';

class RenderList extends React.Component {
	componentDidMount(){
		this.props.getRestaurants();

	}
	renderList = props => {
		if (this.props.restaurants) {
			return this.props.restaurants.map( restaurant => {
				// const imageURL = restaurant.photos[0].html_attributions[0].slice(8, 68);
				const priceN = restaurant.price_level;
				const ratingN = Math.floor(restaurant.rating);
				const dollarIcons = _(priceN).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(ratingN).times(i => <i className="star outline icon" key={i}></i>);
				if (restaurant.business_status === "OPERATIONAL") {
					return (
						<div className="item" key={restaurant.place_id}>
							<h3>{restaurant.name}</h3>
							<div className="content">
								<img href={"/"} alt="source unavailable"/>
								<h5>{restaurant.vicinity}</h5>
								<div className="ui label">
									<h5>Rating: {starsIcons}</h5>
									<h5>Price: {dollarIcons}</h5>
									<h5>Total reviews: {restaurant.user_ratings_total}</h5>
								</div>
								<p>{restaurant.photos[0].photo_reference}</p>
							</div>
						</div>
					);
				}
			})
		} 
		return <div>There was an error processing getRestaurants API request</div>;
	}

	renderPhotos = props => {
		console.log(this.props.restaurants);
		//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY

	} 

	render(){
		console.log(this.props);
		return (
			<div>{this.renderList()}</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		restaurants: state.restaurants.data.results
	}
	
};

export default connect(
	mapStateToProps,
	{ getRestaurants, getCoords }
 )(RenderList);