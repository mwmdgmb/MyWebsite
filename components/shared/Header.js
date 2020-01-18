import React, { Component } from 'react';
import Link from 'next/link';

export class Header extends Component {
	render() {
		const { title } = this.props;
		return (
			<React.Fragment>
				<p>{title}</p>
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/about">
					<a style={{ margin: '0 5px' }}>About</a>
				</Link>
				<Link href="/profiles">
					<a>Profile</a>
				</Link>
				<Link href="/cv">
					<a style={{ margin: '0 5px' }}>CV</a>
				</Link>
				<Link href="/blog">
					<a>Blog</a>
				</Link>
			</React.Fragment>
		);
	}
}

export default Header;
