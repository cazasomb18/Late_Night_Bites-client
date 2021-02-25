import React from 'react';

const style = {
	display: "flex",
	justifyContent: "center",
}

const textStyle = {
	transform: "translateY(10px)"
} 

const className = "ui headline"

const AppTitle = (props) => {
	return(
		<div style={style} className="titleContainer">
			<h1 style={textStyle} className={className}>LATE NIGHT BITES
			<i className={"moon icon"}></i>
			</h1>
		</div>
	);
};

export default AppTitle;