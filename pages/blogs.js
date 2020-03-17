import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import { Link } from "../routes";
// icon
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import Particles from "react-particles-js";
import { getBlogs } from "../actions";
import { shortenText } from "../helpers/utils";

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
  static async getInitialProps({ req }) {
    let blogs = [];
    try {
      blogs = await getBlogs(req);
    } catch (e) {
      console.log(e);
    }
    return { blogs };
  }

  renderBlogs = blogs =>
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link route={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{shortenText(blog.subTitle)}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format("LL")}
        </p>
      </div>
    ));

  render() {
    const { blogs } = this.props;
    return (
      <BaseLayout
        {...this.props.auth}
        headerType="landing"
        className="blog-listing-page bg-transparent"
        title="Mohammad Garmabi - Newest Blogs to Read"
      >
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
            position: "absolute",
            top: "0"
          }}
          width="100%"
          height="600px"
        />
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {this.renderBlogs(blogs)}
              <div className="clearfix">
                <a className="text-custom float-right" href="/blogEditor">
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
                      <a target="_blank" href="https://t.me/Mohammad_Garmabi">
                        <span className="fa-stack fa-lg">
                          <TelegramIcon fontSize="large" style={{ color: "#17a2b8" }} />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href="https://github.com/mwmdgmb">
                        <span className="fa-stack fa-lg">
                          <GitHubIcon
                            fontSize="large"
                            style={{ color: "#262626" }}
                          />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item disabled">
                      <a target="_blank" href="https://www.instagram.com/mwmd__gmb" className="disabled">
                        <span className="fa-stack fa-lg">
                          <InstagramIcon fontSize="large" color="primary" />
                        </span>
                      </a>
                    </li>
                   
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Mwmd Gmb 2020
                  </p>
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
