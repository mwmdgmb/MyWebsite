import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import { Container, Col, Row } from "reactstrap";
import bg from "../assets/images/firewatch-sd-1600x900.jpg";
import seletionOwn from "../assets/images/section-1.jpg";
import seletionTwo from "../assets/images/section-2.jpg";
import Typed from "react-typed";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.roles = [
      "React js",
      "Next js",
      "Javascript",
      "Material-Ui",
      "Bootstrap 4",
      "Sass Css",
      "MongoDB",
      "Node js",
      "Express js"
    ];
    this.state = {
      isFlipping: false
    };
  }
  componentDidMount() {
    this.animatedCard();
  }
  componentWillUnmount() {
    this.card && clearInterval(this.card);
  }

  animatedCard() {
    this.card = setInterval(() => {
      this.setState({ isFlipping: !this.state.isFlipping });
    }, 10000);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isFlipping } = this.state;
    return (
      <BaseLayout
        className={`cover ${isFlipping ? "cover-1" : "cover-0"}`}
        {...this.props.auth}
        headerType="index"
        title="Mohammad Garmabi - Home"
      >
        <div className="main-section">
          <div className="background-image">
            <img className="image" src={bg} alt="Background Home Page" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Front End Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        alt="Guy programming welcome picture"
                        className="image"
                        src={seletionOwn}
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Profesional and top quality service in web
                          development.
                        </div>
                      </div>
                      <img
                        alt="Guy programming welcome picture"
                        className="image"
                        src={seletionTwo}
                      />
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper mt-5 text-center">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && (
                      <span className="active">
                        {" "}
                        <b> {user.name} </b>{" "}
                      </span>
                    )}
                    <br />
                    Welcome to the portfolio website of Mohammad Garmabi. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={100}
                  backSpeed={60}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />

                <div className="hero-welcome-bio">
                  <h2>Let's take a look on my work.</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Home;
