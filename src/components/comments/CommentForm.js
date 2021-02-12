import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

class CommentForm extends React.Component {
	componentDidMount(){

	}

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="error">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type }) => {
		const className = `field ui header ${meta.error && meta.touched ? 'error': ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} placeholder={label} type={type} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	}

	renderReadOnlyInput = ({ label, type, defaultValue}) => {
		const className = "field ui header";
		return (
			<div className={className}>
				<label>{label}</label>
				<input readOnly type={type} defaultValue={defaultValue}/>
			</div>
		);
	}

	onSubmit = formValues => {
		this.props.postComment(formValues);
	}

	render(){
		return(
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field 
					name="restaurant_name name" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.name} 
					type="text" 
					label="Restaurant Name"
				/>
				<Field 
					name="address" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.vicinity + ", " + this.props.restaurant.plus_code.compound_code.split(',')[1].split()}
					type="text" 
					label="Address"
				/>
				<Field 
					name="place_id" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.restaurant.place_id} 
					type="text" 
					label="Place Id"
				/>
				<Field 
					name="commentInput" 
					component={this.renderInput} 
					type="text" 
					label="Comment"
				/>
				<Field 
					name="commentAuthor" 
					component={this.renderReadOnlyInput} 
					defaultValue={this.props.userName} 
					type="text" 
					label="Author" 
				/>
				{/*<Field name="name" component={this.renderReadOnlyInput} defaultValue={this.props.restaurant.name} type="text" label="Restaurant Name"/>*/}
				<button className="ui button primary" type="submit">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.commentInput) {
		errors.commentInput = 'You must enter a comment'
	}
	return errors;
};

export default reduxForm({
	form: 'commentForm',
	validate
})(CommentForm);