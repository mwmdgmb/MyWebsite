import React from 'react';
import App from 'next/app';
import auth0 from '../services/auth0';

// StyleList
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		const user = process.browser ? auth0.clientAuth() :
			auth0.serverAuth(ctx.req);

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		let auth = { user, isAuthenticated: !!user };

		return { pageProps, auth };
	}
	render() {
		const { Component, pageProps, auth } = this.props;
		return <Component {...pageProps} auth={auth} />;
	}
}
