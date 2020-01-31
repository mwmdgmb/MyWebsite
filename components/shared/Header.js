import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import auth0 from './../../services/auth0';
import ActiveLink from './ActiveLink';
import Link from 'next/link';

const BsNavLink = (props) => {
	const { route, title } = props;

	return (
		<ActiveLink activeClassName="active" href={route}>
			<a className="nav-link port-navbar-link">{title}</a>
		</ActiveLink>
	);
};

const Login = () => {
	return (
		<button onClick={auth0.login} className="nav-link btn text-center  clickable">
			Login
		</button>
	);
};
const Logout = () => {
	return (
		<span onClick={auth0.logout} className="nav-link btn btn-danger text-center clickable">
			Logout
		</span>
	);
};

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isDesplay: false
		};
		this.toggle = this.toggle.bind(this);
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	toggleTheme = () => {
		this.setState({
			isDesplay: !this.state.isDesplay
		});
	};

	activeMode = (mode) => {
		switch (mode) {
			case 'dark':
				document.body.classList.add('dark-theme');
				break;
			default:
				document.body.classList.remove('dark-theme');
				break;
		}
	};
	activeModeColor = (color) => {
		switch (color) {
			case 'success':
				document.body.style.color = '#28a745';
				break;
			case 'primary':
				document.body.style.color = '#007bff';
				break;
			case 'secondary':
				document.body.style.color = '';
				// document.body.style.background = '';
				break;
		}
	};
	render() {
		const { isAuthenticated, user } = this.props;

		return (
			<div>
				<Navbar light expand="md" className="port-navbar port-default shadow-lg">
					<div className="container-fluid px-5">
						<NavbarBrand classname="port-navbar-brand">
							<div className="d-flex flex-row">
								{
									isAuthenticated ? <div className="d-flex flex-row">
										<span style={{ width: '45px' }}>
											<img
												src={user.picture}
												className="img-fluid rounded-circle relativeToggle"
												onClick={this.toggleTheme}
											/>
											{
												this.state
													.isDesplay ? <div className="d-flex flex-column flex-wrap shadow-lg rounded justify-content-around align-items-center toggleTheme">
													<div className="d-flex flex-row justify-content-around align-items-center">
														<span
															className="badge badge-dark rounded-circle p-3 mr-1"
															onClick={() => this.activeMode('dark')}
														/>
														<span
															className="badge  badge-light rounded-circle p-3 ml-1"
															onClick={() => this.activeMode('light')}
														/>
													</div>
													<div className="d-flex flex-row justify-content-around align-items-center">
														<span
															className="badge  badge-success rounded-circle p-2"
															onClick={() => this.activeModeColor('success')}
														/>
														<span
															className="badge  badge-primary rounded-circle p-2 mx-2"
															onClick={() => this.activeModeColor('primary')}
														/>
														<span
															className="badge  badge-secondary rounded-circle p-2"
															onClick={() => this.activeModeColor('secondary')}
														/>
													</div>
												</div> :
													null
											}
										</span>
									</div> :
									null
									}
								<Link href="/secret">
									{isAuthenticated ? <a className="active nav-link">{user.name}</a> : <a className="active nav-link">Mwmd Gmb</a>}
								</Link>
							</div>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar color="dark">
							<Nav className="m-auto" navbar>
								<NavItem clasName="port-navbar-item">
									<BsNavLink route="/" title="Home" />
								</NavItem>
								<NavItem clasName="port-navbar-item">
									<BsNavLink route="/about" title="About" />
								</NavItem>
								<NavItem clasName="port-navbar-item">
									<BsNavLink route="/profiles" title="Profile" />
								</NavItem>
								<NavItem clasName="port-navbar-item">
									<BsNavLink route="/cv" title="CV" />
								</NavItem>
								<NavItem clasName="port-navbar-item">
									<BsNavLink route="/blog" title="Blog" />
								</NavItem>
							</Nav>

							{!isAuthenticated && <Login />}
							{isAuthenticated && <Logout />}
						</Collapse>
					</div>
				</Navbar>
			</div>
		);
	}
}
