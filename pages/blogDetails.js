import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";
import { getSlug } from "../actions";
import { Row, Col } from "reactstrap";

export class BlogDetails extends Component {
  static async getInitialProps({ query }) {
    let blogs = {};
    const slug = query.slug;
    try {
      blogs = await getSlug(slug);
    } catch (error) {
      console.log(error.message);
    }

    return { blogs };
  }
  render() {
    const { blogs } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-details-page">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>{blogs.story}</Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default BlogDetails;
