import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import { Container } from 'reactstrap';
import bg from '../assets/images/bg-jpg.jpg';
import Typed from 'react-typed';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.roles = [ 'reactjs', 'nextjs', 'javascript', 'bootstrap4', 'reactstrap' ];
	}

	render() {
		// const { isAuthenticated, user } = this.props.auth;
		return (
			<BaseLayout className="cover" {...this.props.auth}>
				<div className="main-section">
					<div className="background-image">
						<img className="background-image-img" src={bg} />
					</div>
					<Container>
						<div className="posotion-custom rounded shadow-lg w-50">
							<div className={`flipper`}>
								<div>
									<h2> Front End Web Developer ✌</h2>
									<small className="">Have a look at my portfolio and job history.</small>
									<p>
										{/* {isAuthenticated && <h1>{user.name}</h1>} */}
										Welcome to the Person website of Mwmd Gmb. Get informed, collaborate and discover projects I was
										working on through the years!
									</p>
								</div>
							</div>
							<b style={{ fontSize: '25px', color: 'orangered' }}>Sbeciality : </b>
							<Typed
								loop
								typeSpeed={60}
								backSpeed={60}
								strings={this.roles}
								backDelay={2000}
								loopCount={0}
								showCursor
								className="self-typed"
								cursorChar="|"
							/>
						</div>
						<div>hello world</div>
					</Container>
				</div>
			</BaseLayout>
		);
	}
}

export default Home;
