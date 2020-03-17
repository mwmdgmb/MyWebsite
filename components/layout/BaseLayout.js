import React from "react";
import Header from "../shared/Header";
import Head from "next/head";

const BaseLayout = props => {
  const { className, children, isAuthenticated, user, isSiteOwner , title , cannonical } = props;
  const headerType = props.headerType || "default";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="My name is Mohammad Garmabi - Front End & React.js Developer" />
        <meta name="keywords" content="garmabi website , mohammad garmabi , mohammad , website , garmabi react.js , garmabi next.js , garmabi portfolio , garmabi developer , anonymous , garmabi javascript " />
        <meta property="og:title" content="Mohammad Garmabi - programmer , Mohammad Garmabi - React.js , Mohammad Garmabi Developer, bloger ,developer " />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.NAMESPACE}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="My name is Mohammad Garmabi - Front End & React.js Developer" />
        {cannonical && <link rel="cannonical" href={`${process.env.NAMESPACEprocess.env.NAMESPACE}${cannonical}`} />}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
          user={user}
          isSiteOwner={isSiteOwner}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default BaseLayout;
