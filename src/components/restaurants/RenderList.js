import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MapContainer from '../map/MapContainer';
import { getRestaurants, getCoords } from '../../actions';
import PostComments from '../comments/PostComments';

class RenderList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addingComment: false,
			targetRestaurant: null,
			commentInput: ''
		}
	}

	componentDidMount(){
		if (this.props.lng && this.props.lat) {
			this.props.getRestaurants();
		}
	}

	renderList = props => {
		if (this.props.restaurants !== undefined ) {
			return this.props.restaurants.map( (restaurant, index) => {
				const photoReference = restaurant.photos[0].photo_reference;
				const priceN = restaurant.price_level;
				const ratingN = Math.floor(restaurant.rating);
				const dollarIcons = _(priceN).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(ratingN).times(i => <i className="star outline icon" key={i}></i>);
				if (restaurant.business_status === "OPERATIONAL") {
					return (
						<div className="item" key={restaurant.place_id}>
							<h3>{restaurant.name}</h3>
							<div className="content">
								<img href={'/'} alt="source unavailable"/>
								<h5>{restaurant.vicinity}</h5>
								<div className="ui label">
									<h5>Rating: {starsIcons}</h5>
									<h5>Price: {dollarIcons}</h5>
									<h5>Total reviews: {restaurant.user_ratings_total}</h5>
								</div>
								<p>{photoReference}</p>
								<button 
									className="ui primary button" 
									onClick={this.toggleCommentView} 
									id={index}
								>Add Comment
								</button>
							</div>
						</div>
					);
				}
				return null;
			})
		} 
		return <div>There was an error processing getRestaurants API request</div>;
	}

	toggleCommentView = (e, id) => {
		if (!this.state.addingComment){
			this.setState({
				addingComment: true,
				targetRestaurant: this.props.restaurants[e.currentTarget.id]
			})
		};
		if (this.state.addingComment){
			this.setState({
				addingComment: false,
				targetRestaurant: null
			})
		};
	}

	renderComponent = () => {
		if (!this.state.addingComment){
			return (
				<div>
					<div className="ui list">
						{this.renderList()}
					</div>
					<MapContainer 
						restaurants={this.props.restaurants} 
						lat={this.props.latitude} 
						lng={this.props.longitude} 
						getRestaurants={this.props.getRestaurants}
					/>
				</div>
			)
		} return (
			<div>
				<PostComments restaurant={this.state.targetRestaurant}/>
				<button 
					className="ui red button"
					onClick={this.toggleCommentView} 
				>Exit
				</button>
			</div>
		);
	}

	render(){
		console.log(this.state);
		return <div>{this.renderComponent()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		lat: state.coords.latitude,
		lng: state.coords.longitude,
		restaurants: state.restaurants.data.results
	}
	
};

export default connect(
	mapStateToProps,
	{ getRestaurants, getCoords }
 )(RenderList);