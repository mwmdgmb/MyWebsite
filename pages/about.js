import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "./../components/BasePage";
import { Row, Col } from "reactstrap";

export class About extends Component {
  render() {
    return (
      <BaseLayout
        title="Mohammad Garmabi - Learn More About Me"
        {...this.props.auth}
      >
        <BasePage className="about-page">
          <Row className="d-flex flex-row flex-wrap align-items-lg-baseline">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">
                  Feel free to read short description about me.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="biography fadein d-flex flex-column align-items-center">
                <p>
                  My name is{" "}
                  <span className="text-danger">Mohammad Garmabi</span> and I'm
                  a React programmer and have a strong interest in security and
                  the hacking world.{" "}
                </p>
                <p>
                  I am a university dropout in petroleum engineering in 2013 and
                  am currently working on and training in React
                </p>
                <p>
                  Throughout my career, I have acquired advanced technical
                  knowledge and the ability to explain programming topics
                  clearly and in detail to a broad audience. I invite you to
                  take my course, where I have put a lot of effort to explain
                  web and software engineering concepts in a detailed, hands-on
                  and understandable way.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
