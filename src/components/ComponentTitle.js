import React from 'react';

const ComponentTitle = (props) => {
	const className = "ui header";
	if (props.addingComment) {
		return (
			<div>
				<h2 className={className}>Adding Comment View
				<i className={"plus icon"}></i>
				</h2>
			</div>
		);
	}
	if (props.viewingRestaurant) {
		return (
			<div>
				<h2 className={className}>Restaurant Show
				<i className={"utensils icon"}></i>
				</h2>
			</div>
		);
	}
	if (props.editingComment) {
		return(
			<div>
				<h2 className={className}>Editing Comment View
				<i className={"settings icon"}></i>
				</h2>
			</div>
		);
	}
};

export default ComponentTitle;