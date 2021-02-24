import React from 'react';

const CommentButtons = (props) => {
	return (
		<div className="ui grid container">
			<div className="eight wide column">
				<button 
					className="ui primary button" 
					onClick={props.toggleCommentForm} 
				>Add Comment
				</button>
			</div>
			<div className="eight wide column">
				<button
					className="ui red button" 
					onClick={props.toggleRestaurantView}
				>Exit to List
				</button>
			</div>
		</div>
	)
};
						
export default CommentButtons;