import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';

export class Cv extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="cv-page">
					<h1>I am CV Page With Class Component</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Cv;
