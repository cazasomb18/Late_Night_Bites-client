import React from 'react';

const CommentButton = (props) => {
	return (
		<div>
			<button 
				className="button-item ui primary button content" 
				onClick={props.toggleCommentView} 
				>Add Comment
			</button>
		</div>
	)
};
						
export default CommentButton;