import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "components/Layout/layoutMain/LayoutMain";

import "styles/pages/about.scss";

const About = props => {

  // need during build time...
  const isBrowser = typeof window !== `undefined`;

  const [ language, switchLang ] = useState(
    (isBrowser) ?
      localStorage.getItem("lastChosenLang") ||
      document.documentElement.getAttribute("lang") ||
      "en" : "en"
  );

  useEffect(
    () => {
      // language
      switchLang(
        localStorage.getItem("lastChosenLang") ||
        document.documentElement.getAttribute("lang") ||
        "en"
      );
      // theme
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("lastChosenTheme") || "light"
      );
    },
    [language]
  );

  const { allMarkdownRemark: { edges : data } } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "asset-about"}}},
      ) {
        edges {
          node {
            id
            frontmatter {
              lang
              title
            }
            html
          }
        }
      }
    }
  `);

  const pages = {};
  data.forEach(document => {
    pages[document.node.frontmatter.lang] = {
      title: document.node.frontmatter.title,
      html: document.node.html,
    }
  });

  return (
    <div id="about-page">
      <Layout switchLang={switchLang}>
        <article
          dangerouslySetInnerHTML={{ __html: pages[language].html }}>
        </article>
      </Layout>
    </div>    
  );
}

export default About;
