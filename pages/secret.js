import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import axios from 'axios';
// import { getSecretData } from './../actions/index';

export class Secret extends Component {
	// static async getInitialProps({ req }) {
	// 	const authSecretData =
	// 		process.browser ? await getSecretData() :
	// 		await getSecretDataServer(req);

	// 	console.log(authSecretData);
	// 	return { authSecretData };
	// }

	state = {
		secretData: []
	};

	async componentDidMount() {
		const res = await axios.get('/api/v1/secret');
		const secretData = res.data;
		this.setState({
			secretData
		});
	}

	displaySecretData = () => {
		const { secretData } = this.state;

		if (secretData && secretData.length > 0) {
			return secretData.map((data, index) => (
				<div key={index}>
					<p>{data.title}</p>
					<p>{data.description}</p>
				</div>
			));
		}
		return null;
	};

	render() {
		// debugger;
		// const { superSecretValue } = this.props;

		return (
			<BaseLayout {...this.props.auth}>
				<BasePage>
					<h1>I am Secret Page With Class Component</h1>
					{/* <h3>{superSecretValue}</h3> */}
					{this.displaySecretData()}
				</BasePage>
			</BaseLayout>
		);
	}
}

export default withAuth()(Secret);
