import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import { withRouter } from 'next/router';
import axios from 'axios';
import BasePage from '../components/BasePage';

export class Portfolio extends Component {
	static async getInitialProps({ query }) {
		console.log(query);
		const portfolioId = query.id;
		let portfolio = {};
		try {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${portfolioId}`);
			portfolio = response.data;
		} catch (error) {
			console.error(error);
		}

		return { portfolio };
	}

	render() {
		const { portfolio } = this.props;
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1>data in here</h1>
					<h3>
						<strong>Title</strong>: {portfolio.title}
					</h3>
					<p>
						<strong>BODY</strong>: {portfolio.body}
					</p>
					<p>
						<strong>Id</strong> : {portfolio.id}
					</p>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default withRouter(Portfolio);
