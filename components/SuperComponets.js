import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';

export class SuperComponent extends Component {
	constructor(props) {
		super(props);
		this.someVariable = ' just some variable';
	}

	alertName(title) {
		alert(title);
	}

	render() {
		return (
			<BaseLayout>
				<h1>I am SuperComponent Page With Class Component</h1>
			</BaseLayout>
		);
	}
}

export default SuperComponent;
