import React from "react";
import App, { Container } from "next/app";
import auth0 from "../services/auth0";
import { ToastContainer } from "react-toastify";

// StyleList
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";
// import Fonts from "../helpers/Fonts";


export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const user = process.browser
      ? auth0.clientAuth()
      : auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const isSiteOwner = user && user[process.env.NAMESPACE + "/role"] === "siteOwner";

    let auth = { user, isAuthenticated: !!user, isSiteOwner };

    return { pageProps, auth };
  }


  componentDidMount() {
    // Fonts()
  }
  render() {
    const { Component, pageProps, auth } = this.props;
    return (
      <React.Fragment>
        <ToastContainer
          autoClose={2000}
          position="bottom-left"
          className="toast-container"
          toastClassName="dark-toast"
        />
        <Component {...pageProps} auth={auth} />
      </React.Fragment>
    );
  }
}
