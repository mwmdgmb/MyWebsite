import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import PortfolioCreateForm from "../components/Portfolio/PortfolioCreateForm";
// import { Row, Col } from 'reactstrap';
import Grid from "@material-ui/core/Grid";
import { updatePortfolio, getPortfolioById } from "../actions/index.js";
import { Router } from "../routes";

export class PortfolioEdit extends Component {
  static async getInitialProps({ query }) {
    let portfolio = {};
    try {
      portfolio = await getPortfolioById(query.id);
    } catch (error) {
      console.log("Error Get Portfolio By ID", error);
    }
    return { portfolio };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  updatePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);

    updatePortfolio(portfolioData)
      .then(portfolio => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.pushRoute("/portfolios");
      })
      .catch(err => {
        const error = err.message || "Server Error !";
        setSubmitting(false);
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    const { portfolio } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Update Portfolio">
          {/* ReactStrap Grid */}
          {/* <Row>
						<Col sm="12" md="6" lg="6">
							<PortfolioCreateForm />
						</Col>
					</Row> */}
          {/* Mateerial Grid */}
          <Grid
            container
            className="d-flex justify-center justify-content-center"
          >
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <PortfolioCreateForm
                initialValues={portfolio}
                error={error}
                onSubmit={this.updatePortfolio}
              />
            </Grid>
          </Grid>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioEdit);
// initialValues={portfolio}

//
