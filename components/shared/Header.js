import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import auth0 from "./../../services/auth0";
import ActiveLink from "./ActiveLink";
import Link from "next/link";

const BsNavLink = props => {
  const { route, title } = props;

  return (
    <ActiveLink activeClassName="active" href={route}>
      <a className={`nav-link port-navbar-link `}>{title}</a>
    </ActiveLink>
  );
};

const Login = () => {
  return (
    <span
      onClick={auth0.login}
      className="nav-link btn text-center d-sm-block clickable"
    >
      Login
    </span>
  );
};
const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link btn btn-danger text-center d-sm-block clickable"
    >
      Logout
    </span>
  );
};

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDesplay: false,
      isDropDownMenu: false
    };
    this.toggle = this.toggle.bind(this);
    // this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleMenu = () => {
    this.setState({
      isDropDownMenu: !this.state.isDropDownMenu
    });
  };
  toggleTheme = e => {
    this.setState({
      isDesplay: !this.state.isDesplay
    });
  };

  activeMode = mode => {
    switch (mode) {
      case "dark":
        document.body.classList.add("dark-theme");
        break;
      default:
        document.body.classList.remove("dark-theme");
        break;
    }
  };
  activeModeColor = color => {
    switch (color) {
      case "success":
        document.body.style.color = "#28a745";
        break;
      case "primary":
        document.body.style.color = "#007bff";
        break;
      case "secondary":
        document.body.style.color = "";
        // document.body.style.background = '';
        break;
    }
  };

  renderBlogMenu = () => {
    const { isSiteOwner } = this.props;
    if (isSiteOwner) {
      return (
        <Dropdown
          className="port-nav-base port-navbar-link "
          isOpen={this.state.isDropDownMenu}
          toggle={this.toggleMenu}
        >
          <DropdownToggle className="port-navbar-item" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blogs" title="Blogs" />
              </NavItem>
            </DropdownItem>
            <DropdownItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blogs/new" title="Create a Blog" />
              </NavItem>
            </DropdownItem>
            <DropdownItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blogs/dashboard" title="Blog Dashboard" />
              </NavItem>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog" />
      </NavItem>
    );
  };

  render() {
    const { isAuthenticated, user, className } = this.props;
    const isOpen = this.state.isOpen ;
    const menuOpenClass = isOpen ? "menu-open" : "menu-close";

    return (
      <div>
        <Navbar
          light
          expand="md"
          className={`port-navbar port-nav-base ${className} ${menuOpenClass} shadow-lg`}
        >
          <div className="container-fluid px-5">
            <NavbarBrand className="port-navbar-brand">
              <div className="d-flex flex-row">
                {isAuthenticated ? (
                  <div className="d-flex flex-row">
                    <span style={{ width: "45px" }}>
                      <img
                        src={user.picture}
                        className="img-fluid rounded-circle relativeToggle"
                        onClick={this.toggleTheme}
                      />
                      {this.state.isDesplay ? (
                        <div className="d-flex flex-column flex-wrap shadow-lg rounded justify-content-around align-items-center toggleTheme">
                          <div className="d-flex flex-row justify-content-around align-items-center">
                            <span
                              className="badge badge-dark rounded-circle p-3 mr-1"
                              onClick={() => this.activeMode("dark")}
                            />
                            <span
                              className="badge  badge-light rounded-circle p-3 ml-1"
                              onClick={() => this.activeMode("light")}
                            />
                          </div>
                          <div className="d-flex flex-row justify-content-around align-items-center">
                            <span
                              className="badge  badge-success rounded-circle p-2"
                              onClick={() => this.activeModeColor("success")}
                            />
                            <span
                              className="badge  badge-primary rounded-circle p-2 mx-2"
                              onClick={() => this.activeModeColor("primary")}
                            />
                            <span
                              className="badge  badge-secondary rounded-circle p-2"
                              onClick={() => this.activeModeColor("secondary")}
                            />
                          </div>
                        </div>
                      ) : null}
                    </span>
                  </div>
                ) : null}
                <Link href="/secret">
                  {isAuthenticated ? (
                    <a className="active nav-link">
                      <small>{user.name}</small>
                    </a>
                  ) : (
                    <a className="active nav-link">Mwmd Gmb</a>
                  )}
                </Link>
              </div>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar color="dark">
              <Nav className="m-auto" navbar>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/" title="Home" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/about" title="About" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/portfolios" title="Portfolios" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/cv" title="CV" />
                </NavItem>
                {this.renderBlogMenu()}
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
