import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import { withRouter } from 'next/router';
import axios from 'axios';

export class Profile extends Component {
	static async getInitialProps({ query }) {
		console.log(query);
		const profileId = query.id;
		let prof = {};
		try {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${profileId}`);
			prof = response.data;
		} catch (error) {
			console.error(error);
		}

		return { prof };
	}

	render() {
		const { prof } = this.props;
		return (
			<BaseLayout>
				<h1>data in here</h1>
				<h3>
					<strong>Title</strong>: {prof.title}
				</h3>
				<p>
					<strong>BODY</strong>: {prof.body}
				</p>
				<p>
					<strong>Id</strong> : {prof.id}
				</p>
			</BaseLayout>
		);
	}
}

export default withRouter(Profile);
