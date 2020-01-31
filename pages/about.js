import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from './../components/BasePage';

export class About extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="about-page">
					<h1>I am About Page With Class Component</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default About;
