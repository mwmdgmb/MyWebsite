import React, { Component } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "./../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "./../components/slate-editor/Editor";
import { getBlogById, updateBlog } from "../actions";
import { toast } from "react-toastify";
import { Router } from "../routes";

export class BlogEditorUpdate extends Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;
    let blog = {};

    try {
      blog = await getBlogById(blogId);
      return { blog };
    } catch (err) {
      console.error(err);
    }

    return { blog };
  }
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false
    };

    this.updateBlog = this.updateBlog.bind(this);
  }
  updateBlog(story, heading) {
    const { blog } = this.props;

    const updatedBlog = {};
    updatedBlog.title = heading.title;
    updatedBlog.subTitle = heading.subtitle;
    updatedBlog.story = story;

    this.setState({ isSaving: true });

    updateBlog(updatedBlog, blog._id)
      .then(updatedBlog => {
        toast.success("Blog Saved Succesfuly!");
        Router.pushRoute("/userBlogs");
        this.setState({ isSaving: false });
      })
      .catch(err => {
        this.setState({ isSaving: false });
        const message = err.message || "Server Error!";
        toast.error(
          "Unexpected Error, Copy your progress and refresh browser please."
        );
        console.error(message);
      });
  }

  // updatedBlogs = story => {
  //   const { blog } = this.props;

  //   let updated = {};

  //   updated.title = blog.title;
  //   updated.subTitle = blog.subTitle;
  //   updated.story = blog.story;

  //   this.setState({
  //     isLoading: true
  //   });
  //   updateBlog(updated, blog._id)
  //     .then(updatedData => {
  //       toast.success("Blog Saved Successfuly !");
  //       this.setState({ isLoading: false });
  //     })
  //     .catch(e => {
  //       this.setState({ isLoading: false });
  //       const msg = e.message || "Server Error";
  //       toast.error(
  //         "Unexpected Error , Copy your progress and refresh browser please."
  //       );
  //       console.log(msg);
  //     });
  // };

  render() {
    const { blog } = this.props;
    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-editor-page">
          <SlateEditor
            initialValue={blog.story}
            isLoading={isSaving}
            save={this.updateBlog}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditorUpdate);
