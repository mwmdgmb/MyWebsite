import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';

export class Blog extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="blog-page">
					<h1>I am Blog Page With Class Component</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Blog;
