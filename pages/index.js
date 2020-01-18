import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import SuperComponent from './../components/SuperComponets';
import axios from 'axios';

export class Home extends SuperComponent {
	static async getInitialProps() {
		let userData = {};
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
			userData = response.data;
		} catch (error) {
			console.error(error);
		}

		return { initialData: [ 1, 2, 3, 4 ], userData };
	}

	constructor(props) {
		super(props);
		this.state = {
			title: 'i am default state'
		};
	}

	componentDidMount() {
		console.log('componentDidMounted');
	}

	UpdateState = () => {
		this.setState({
			title: 'i am updeted state'
		});
	};
	render() {
		const { title } = this.state;
		const { initialData, userData } = this.props;
		return (
			<BaseLayout>
				<h1>I am Home Page With Class Component</h1>
				<h2>{title}</h2>
				<h2>{userData.title}</h2>
				<button onClick={this.UpdateState}>Change Title</button>
			</BaseLayout>
		);
	}
}

export default Home;
