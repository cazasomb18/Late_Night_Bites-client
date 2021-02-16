import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MapContainer from '../map/MapContainer';
import { getRestaurants } from '../../actions';
import PostComments from '../comments/PostComments';
import Spinner from '../geo/Spinner';
import './restaurants.css';

class RenderList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addingComment: false,
			targetRestaurant: null
		}
	}

	componentDidMount(){
		this.props.getRestaurants();
	}

	renderList = props => {
		if (this.props.restaurants.status === 200) {
			return this.props.restaurants.data.results.map( (restaurant, index) => {
				const address = restaurant.vicinity + ", " + restaurant.plus_code.compound_code.split(',')[1].split();
				const photoReference = restaurant.photos[0].photo_reference;
				const dollarIcons = _(restaurant.price_level).times(i => <i className="dollar sign icon" key={i}></i>);
				const starsIcons = _(Math.floor(restaurant.rating)).times(i => <i className="star outline icon" key={i}></i>);
				if (restaurant.business_status === "OPERATIONAL") {
					return (
						<div className="item" key={restaurant.place_id}>
							<h3>{restaurant.name}</h3>
							<div className="content">
								{/*<img href={'/'} alt="source unavailable"/>*/}
								<h5 className="ui header">{address}</h5>
								<div className="ui label content">
									<h5>Rating: {starsIcons}</h5>
									<h5>Price: {dollarIcons}</h5>
									<h5>Total reviews: {restaurant.user_ratings_total}</h5>
								</div>
								{/*<p>{photoReference}</p>*/}
								<button 
									className="ui primary button content" 
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
		return <Spinner message="Finding Late Night Bites"/>;
	}

	toggleCommentView = (e, id) => {
		if (!this.state.addingComment){
			this.setState({
				addingComment: true,
				targetRestaurant: this.props.restaurants.data.results[e.currentTarget.id]
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
					<MapContainer/>
				</div>
			)
		} return (
			<div>
				<PostComments 
					restaurant={this.state.targetRestaurant} 
					toggleCommentView={this.toggleCommentView}
				/>
				<button 
					className="ui red button"
					onClick={this.toggleCommentView} 
				>Exit
				</button>
			</div>
		);
	}

	render(){
		return <div>{this.renderComponent()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		lat: state.coords.lat,
		lng: state.coords.lng,
		restaurants: state.restaurants,
		user: state.auth.user
	}
	
};

export default connect(
	mapStateToProps,
	{ getRestaurants }
 )(RenderList);