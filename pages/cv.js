import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col, Jumbotron } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import CName from '../assets/pdf/mwm-gmb.jpg'

export class Cv extends Component {
	render() {
		return (
			<BaseLayout title="Mohammad Garmabi - Get My CV" {...this.props.auth}>
				<BasePage title="Preview of my CV">
					<Row>
						<Col md={{size:8 , offset:2}}>
							<div className="cv-title text-right">
							<Tooltip title="Download CV" placement="top">
							<a download="CV-Mohammad_Garmabi.pdf"  className="btn mb-5 bg-success" href="../assets/pdf/mwmd-gmb.pdf" >
									Download
								</a>
									</Tooltip>
								
							</div>
							<Jumbotron>
								<a download="CV-Mohammad_Garmabi.pdf" href="../assets/pdf/mwmd-gmb.pdf" >
									<img download="mwmd-gmb.pdf" className="img img-fluid overlay-cv" src={CName} />	
								</a>
							</Jumbotron>
						</Col>
					</Row>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Cv;
