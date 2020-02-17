import React, { Component, useState } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
// import axios from 'axios';
// import { Link } from '../routes';
import { Row, Card, CardHeader, CardBody, CardText, Col, CardTitle } from 'reactstrap';
import BasePage from '../components/BasePage';
import { getPortfolios, deletePortfolio } from '../actions';
import { Router } from '../routes';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export class Portfolios extends Component {
	static async getInitialProps() {
		// let posts = [];
		// try {
		// 	const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
		// 	posts = response.data;
		// } catch (error) {
		// 	console.error(error);
		// }

		// return { posts: posts.splice(0, 10) };

		let portfolios = [];

		try {
			portfolios = await getPortfolios();
		} catch (error) {
			console.log(error);
		}

		return { portfolios };
	}
	DisplayDeleteWarning = (portfolioId) => {	
		confirmAlert({
			  customUI: ({ onClose }) => {
			    return (
			      <div className='custom-ui'>
			        <h1>Are you sure?</h1>
			        <p>You want to delete this file?</p>
			        <button className="closeEvent" onClick={onClose}>No</button>
			        <button
			         className="DeleteEvent"
			         onClick={() => {
			            this.deletePortfolio(portfolioId);
			            onClose();
			          }}
			        >
			          Yes, Delete it!
			        </button>
			      </div>
			    );
			  }
			});
		// const isConfirm = confirm('Are you sure you want to delete this protfolio???');
		// if (isConfirm) {
		// 	this.deletePortfolio(portfolioId);
		// }
	};
	deletePortfolio = (portfolioId) => {
		deletePortfolio(portfolioId)
			.then(() => {
				Router.pushRoute('/portfolios');
			})
			.catch((err) => console.log(err));
	};

	renderPortfolios(portfolios) {
		const { isAuthenticated, isSiteOwner } = this.props.auth;
		return portfolios.map((portfolio, index) => (
			<Col md="4" key={index}>
				<React.Fragment>
					<span>
						<Card className="portfolio-card">
							<CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
							<CardBody>
								<p className="portfolio-card-city"> {portfolio.location} </p>
								<CardTitle className="portfolio-card-title">{portfolio.company}</CardTitle>
								<CardText className="portfolio-card-text">{portfolio.description}</CardText>
								<div className="readMore"> </div>
							</CardBody>
							{isAuthenticated &&
							isSiteOwner && (
								<div className="my-3">
									<span
										className="btn-edit-portfolio m-2"
										onClick={() => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)}
									>
										<Tooltip title="Edit Item" placement="top">
											<IconButton aria-label="edit">
												<CreateIcon />
											</IconButton>
										</Tooltip>
									</span>
									<div
										onClick={() => this.DisplayDeleteWarning(portfolio._id)}
										className="btn-delete-portfolio d-inline m-2"
									>
										<Tooltip title="Delete Item" placement="top">
											<IconButton aria-label="delete">
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</div>
								</div>
							)}
						</Card>
					</span>
				</React.Fragment>
			</Col>
		));
	}

	render() {
		const { portfolios } = this.props;
		const { isAuthenticated, isSiteOwner } = this.props.auth;

		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="portfolio-page" title="Portfolios Page">
					{isAuthenticated &&
					isSiteOwner && (
						<div className="d-flex flex-row py-3">
							<div className="btn-create-portfolio my-2 rounded " onClick={() => Router.pushRoute('/portfolioNew')}>
								<Tooltip title="Add Item" placement="top">
									<IconButton aria-label="add">
										<AddIcon style={{ color: '#48ff00' }} /> Create Portfolio
									</IconButton>
								</Tooltip>
							</div>
						</div>
					)}
					<Row>{this.renderPortfolios(portfolios)}</Row>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Portfolios;
