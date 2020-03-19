import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioCreateForm from '../components/Portfolio/PortfolioCreateForm';
// import { Row, Col } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { createPortfolio } from '../actions/index';
import { Router } from '../routes';
import moment from 'moment'

const INITAIL_VALUES = {
	title: '',
	company: '',
	location: '',
	position: '',
	description: '',
	startDate: moment(),
	endDate: moment()
};

export class PortfolioNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: undefined
		};
	}

	savePortfolio = (portfolioData, { setSubmitting }) => {
		setSubmitting(true);
		createPortfolio(portfolioData)
			.then((portfolio) => {
				setSubmitting(false);
				this.setState({ error: undefined });
				Router.pushRoute('/portfolios');
			})
			.catch((err) => {
				const error = err.message || 'Server Error !';
				setSubmitting(false);
				this.setState({ error });
			});
	};

	render() {
		const { error } = this.state;
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="portfolio-create-page" title="Create New Portfolio">
					<Grid container className="d-flex justify-center justify-content-center">
						<Grid item xs={12} sm={10} md={8} lg={6}>
							<PortfolioCreateForm initialValues={INITAIL_VALUES} error={error} onSubmit={this.savePortfolio} />
						</Grid>
					</Grid>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default withAuth('siteOwner')(PortfolioNew);
