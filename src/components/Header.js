import React from 'react';
import Link from './Link';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link href="/auth/register" className='item'>
				Register
			</Link>
			<Link href="/auth/login" className='item'>
				Login
			</Link>
			<Link href="/restaurants/nearby/"></Link>
			<Link></Link>
			
		</div>
	)
};

export default Header;