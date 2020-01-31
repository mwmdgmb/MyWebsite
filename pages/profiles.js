import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import axios from 'axios';
import { Link } from '../routes';
import BasePage from '../components/BasePage';

export class Profiles extends Component {
	static async getInitialProps() {
		let posts = [];
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			posts = response.data;
		} catch (error) {
			console.error(error);
		}

		return { posts: posts.splice(0, 10) };
	}

	renderPosts(posts) {
		return posts.map((post, index) => (
			<li key={index}>
				<Link route={`/profile/${post.id}`}>
					<a style={{ fontSize: '20px' }}>{post.title}</a>
				</Link>
			</li>
		));
	}
	render() {
		const { posts } = this.props;
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1>I am Profiles Page With Class Component</h1>
					<ul>{this.renderPosts(posts)}</ul>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Profiles;
