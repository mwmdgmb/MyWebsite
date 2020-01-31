import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import auth0Client from './../services/auth0';
import { withRouter } from 'next/router';

export class Callback extends Component {
	async componentDidMount() {
		const { router } = this.props;
		auth0Client.handleAuthentication();
		router.push('/');
	}
	render() {
		return (
			<BaseLayout>
				<BasePage>
					<h1>Varifying login data ...</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default withRouter(Callback);
