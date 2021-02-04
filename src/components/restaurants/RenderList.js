import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getRestaurants, getCoords } from '../../actions';

class RenderList extends React.Component {
	componentDidMount(){
		this.props.getCoords(()=> {this.props.getRestaurants()});
		this.generateIcon();

	}
	renderList = props => {
		if (this.props.restaurants !== undefined) {
			const restaurants = this.props.restaurants;
			return restaurants.map( restaurant => {
				const imageURL = restaurant.photos[0].html_attributions[0].slice(8, 68);
				const priceN = restaurant.price_level;
				const ratingN = Math.floor(restaurant.rating);
				const dollarIcons = _(priceN).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(ratingN).times(i => <i className="star outline icon" key={i}></i>);
				return (
					<div className="item" key={restaurant.place_id}>
						<h3>{restaurant.name}</h3>
						<div className="content">
							<img src={imageURL} alt="source unavailable"/>
							<h5>{restaurant.vicinity}</h5>
							<h5>Rating: {starsIcons}</h5>
							<h5>Price: {dollarIcons}</h5>
							<h5>Total reviews: {restaurant.user_ratings_total}</h5>
						</div>
					</div>
				);
			})
		} return <div>There was an error processing getRestaurants API request</div>
	}

	generateIcon(){
		return <i className="dollar sign icon"></i>;
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