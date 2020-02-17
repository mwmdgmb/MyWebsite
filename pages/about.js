import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from './../components/BasePage';

export class About extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="about-page" title="I am About Page">
				</BasePage>
			</BaseLayout>
		);
	}
}

export default About;
