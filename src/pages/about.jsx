import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "components/Layout/layoutMain/LayoutMain";

import "styles/pages/about.scss";

const About = props => {

  const [ lang, switchLang ] = useState(
    localStorage.getItem("lastChosenLang") ||
    document.documentElement.getAttribute("lang") ||
    "en"
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

  const pages = new Object();
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
          dangerouslySetInnerHTML={{ __html: pages[lang].html}}>
        </article>
      </Layout>
    </div>    
  );
}

export default About;
