import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col, Card, Badge, Button } from "reactstrap";
import { Link, Router } from "../routes";
// icon
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from "@material-ui/icons/Drafts";
import PublishIcon from "@material-ui/icons/Publish";

import withAuth from "../components/hoc/withAuth";
import { getUserBlogs, updateBlog, deleteBlogs } from "../actions";
import PortButtonDropDown from "../components/ButtonDropdown";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class UserBlogs extends Component {
  static async getInitialProps({ req }) {
    let blogs = [];

    try {
      blogs = await getUserBlogs(req);
    } catch (err) {
      console.error(err);
    }

    return { blogs };
  }
  changeBlogStatus = (status, blogId) => {
    updateBlog({ status }, blogId)
      .then(() => {
        Router.pushRoute("/userBlogs");
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  deleteBlog = blogId => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button className="closeEvent" onClick={onClose}>
              No
            </button>
            <button
              className="DeleteEvent"
              onClick={() => {
                this.deleteBlogItems(blogId);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  };
  deleteBlogItems = blogId => {
    deleteBlogs(blogId)
      .then(status => {
        Router.pushRoute("/userBlogs");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  separateBlog = blogs => {
    const published = [];
    const draft = [];

    blogs.forEach(blog => {
      blog.status === "draft" ? draft.push(blog) : published.push(blog);
    });

    return { published, draft };
  };

  createStatus(status) {
    const blog = this.props.blogs;
    return status === "draft"
      ? {
          view: (
            <div
              className={
                blog.status !== "published"
                  ? "d-flex align-items-center justify-content-between text-success"
                  : null
              }
            >
              Publish: <PublishIcon />
            </div>
          ),
          value: "published"
        }
      : {
          view: (
            <div
              className={
                blog.status !== "draft"
                  ? "d-flex align-items-center justify-content-between text-warning"
                  : null
              }
            >
              Drafts:
              <DraftsIcon />
            </div>
          ),
          value: "draft"
        };
  }

  dropdownOptions = blog => {
    const blogStatus = this.createStatus(blog.status);

    return [
      {
        text: blogStatus.view,
        handlers: {
          onClick: () => this.changeBlogStatus(blogStatus.value, blog._id)
        }
      },
      {
        text: (
          <div className="d-flex align-items-center justify-content-between text-danger">
            Delete:
            <DeleteIcon />
          </div>
        ),
        handlers: { onClick: () => this.deleteBlog(blog._id) }
      }
    ];
  };

  renderBlogs = blogs => {
    return (
      <Card className="shadow my-4">
        <ul className="user-blogs-list">
          {blogs.map((blog, index) => (
            <li key={index} className="my-4">
              <Link route={`/blogs/${blog._id}/edit`}>
                <a
                  className={
                    blog.status === "draft" ? "text-warning" : "text-success"
                  }
                >
                  {blog.title.length > 6
                    ? `${blog.title.slice(0, 15)}...`
                    : blog.title}
                </a>
              </Link>
              <PortButtonDropDown items={this.dropdownOptions(blog)} />
            </li>
          ))}
        </ul>
      </Card>
    );
  };

  render() {
    const { blogs } = this.props;

    const { draft, published } = this.separateBlog(blogs);

    return (
      <BaseLayout {...this.props.auth} headerType="landing">
        <div className="masthead-two ">
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Blogs Dashboard</h1>
                  <span className="subheading d-flex flex-column justify-content-center align-items-center">
                    Let's write some nice blog today{" "}
                    <Link route="/blogs/new">
                      <a className="mt-4 py-3 px-5 btn shadow hover">
                        Create a new Blog
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">
                Published Blogs
                <Badge className="text-center text-warning ml-4">
                  {published.length === 0 ? null : published.length}
                </Badge>
              </h2>
              {published.length === 0 ? null : this.renderBlogs(published)}
            </Col>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">
                Draft Blogs
                <Badge className="text-center text-warning ml-4">
                  {draft.length === 0 ? null : draft.length}
                </Badge>
              </h2>
              {draft.length === 0 ? null : this.renderBlogs(draft)}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(UserBlogs);
