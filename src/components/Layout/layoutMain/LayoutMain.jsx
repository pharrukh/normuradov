import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import IconSystem from "components/IconSystem/IconSystem";
import Header from "components/Layout/header/Header";
import Footer from "components/Layout/footer/Footer";

import UpButton from "components/Layout/upButton/UpButton";

import "./layoutMain.scss";

const Layout = (props) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div id="layout-main">
      <IconSystem />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{props.children}</main>
      <Footer switchLang={props.switchLang}/>
      <UpButton />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
