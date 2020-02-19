import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from '../components/BasePage';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import { Link } from '../routes';
// icon
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import Particles from 'react-particles-js';

// const ParticlesObj = {
// 	particles: {
// 		number: {
// 			value: 150
// 			// density: {
// 			// 	enable: true,
// 			// 	value_area: 1000
// 			// }
// 		}
// 	}
// };

export class Blog extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth} headerType="landing" className="blog-listing-page bg-transparent">
				<div className="masthead">
					<div className="overlay" />
					<Container>
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="site-heading">
									<h1>Fresh Blogs</h1>
									<span className="subheading">Programming, travelling...</span>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<Particles
					// params={ParticlesObj}
					style={{
						position: 'absolute',
						top: '0'
					}}
					width="100%"
					height="600px"
				/>
				<BasePage className="blog-body">
					<Row>
						<Col md="10" lg="8" className="mx-auto">
							{
								<React.Fragment>
									<div className="post-preview">
										<Link route={`/blogs/blogId`}>
											<a>
												<h2 className="post-title">Very Nice Blog Post</h2>
												<h3 className="post-subtitle">How I Start Porgramming...</h3>
											</a>
										</Link>
										<p className="post-meta">
											Posted by
											<a href="#"> Mwmd Gmw </a>
											{moment().format('LLLL')}
										</p>
									</div>
									<hr />
									<div className="post-preview">
										<Link route={`/blogs/blogId`}>
											<a>
												<h2 className="post-title">Very Nice Blog Post</h2>
												<h3 className="post-subtitle">How I Start Porgramming...</h3>
											</a>
										</Link>
										<p className="post-meta">
											Posted by
											<a href="#"> Mwmd Gmb </a>
											{moment().format('LLLL')}
										</p>
									</div>
									<hr />
									<div className="post-preview">
										<Link route={`/blogs/blogId`}>
											<a>
												<h2 className="post-title">Very Nice Blog Post</h2>
												<h3 className="post-subtitle">How I Start Porgramming...</h3>
											</a>
										</Link>
										<p className="post-meta">
											Posted by
											<a href="#"> Mwmd Gmb </a>
											{moment().format('LLLL')}
										</p>
									</div>
									<hr />
								</React.Fragment>
							}
							<div className="clearfix">
								<a className="text-custom float-right" href="#">
									Older Posts <span>&rarr;</span>
								</a>
							</div>
						</Col>
					</Row>

					<footer>
						<Container>
							<Row>
								<div className="col-lg-8 col-md-10 mx-auto">
									<ul className="list-inline text-center my-5">
										<li className="list-inline-item">
											<a href="#">
												<span className="fa-stack fa-lg">
													<FacebookIcon fontSize="large" color="primary" />
												</span>
											</a>
										</li>
										<li className="list-inline-item">
											<a href="#">
												<span className="fa-stack fa-lg">
													<GitHubIcon fontSize="large" style={{ color: '#262626' }} />
												</span>
											</a>
										</li>
										<li className="list-inline-item">
											<a href="#">
												<span className="fa-stack fa-lg">
													<InstagramIcon fontSize="large" color="primary" />
												</span>
											</a>
										</li>
									</ul>
									<p className="copyright text-muted">Copyright &copy; Mwmd Gmb 2020</p>
								</div>
							</Row>
						</Container>
					</footer>
				</BasePage>
			</BaseLayout>
		);
	}
}

export default Blog;
