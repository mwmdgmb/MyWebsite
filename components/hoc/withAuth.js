import React, { Component } from 'react';
import BaseLayout from './../layout/BaseLayout';
import BasePage from './../BasePage';

export default function(Component) {
	return class withAuth extends Component {
  
  
    static async getInitialProps(args) {
      const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);


      return { ...pageProps };
    }
  
    renderProtectedPage() {
			const { isAuthenticated } = this.props.auth;
			if (isAuthenticated) {
				return ( <Component {...this.props} />);
			} else {
				return (
					<BaseLayout {...this.props.auth}>
						<BasePage>
							<h1>You are is not Authenticated. Please Login to access this page.</h1>
						</BasePage>
					</BaseLayout>
				);
			}
		}

		render() {
      return this.renderProtectedPage();
		}
	};
}
