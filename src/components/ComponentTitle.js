import React from 'react';

const ComponentTitle = (props) => {
	const className = "ui header";
	if (props.addingComment) {
		return (
			<div>
				<h1 className={className}>Adding Comment View
				<i className={"settings icon"}></i>
				</h1>
			</div>
		);
	}
	if (!props.addingComment) {
		return (
			<div>
				<h1 className={className}>Restaurant Show
				<i className={"utensils icon"}></i>
				</h1>
			</div>
		);
	}
	if (props.editingComment){
		return(
			<div>
				<h1 className={className}>Editing Comment View
				<i className={"settings icon"}></i>
				</h1>
			</div>
		);
	}
	
};

export default ComponentTitle;