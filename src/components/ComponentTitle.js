import React from 'react';

const ComponentTitle = (props) => {
	const className = "ui header";
	if (props.addingComment) {
		return (
			<div>
				<h1 className={className}>Adding Comment View</h1>
			</div>
		);
	}
	if (!props.addingComment) {
		return (
			<div>
				<h1 className={className}>Restaurant Show</h1>
			</div>
		);
	}
	
};

export default ComponentTitle;