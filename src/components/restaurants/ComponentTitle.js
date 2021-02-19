import React from 'react';

const ComponentTitle = (props) => {
	if (props.addingComment){
		return (
			<div>
				<h1 className="ui header">Adding Comment View</h1>
			</div>
		)
	}
	if (!props.addingComment) {
		return (
			<div>
				<h1 className="ui header">Restaurant Show</h1>
			</div>
		);
	}
	
};

export default ComponentTitle;