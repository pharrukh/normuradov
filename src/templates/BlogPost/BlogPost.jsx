import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";

import "./blogPost.scss";

import Layout from "components/Layout/layoutMain/LayoutMain";

const Template = ({ data, pageContext }) => {

  const {frontmatter, html} = data.markdownRemark;
  const [ language, switchLang ] = useState("en");

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

  const postsNavigation = ({ prev, next }) => (
    <div className="nav-posts">
      {
        (prev) ?
          <Link to={prev}>
            <svg>
              <use href="#icon-chevron-double-left" />
            </svg>
          </Link>
        :
          <svg className="nav-empty">
            <use href="#icon-chevron-double-left" />
          </svg>        
      }
      <Link to="/">
        <svg>
          <use href="#icon-home-round" />
        </svg>
      </Link>
      {
        (next) ?
          <Link to={next}>
            <svg>
              <use href="#icon-chevron-double-right" />
            </svg>
          </Link>
        :
          <svg className="nav-empty">
            <use href="#icon-chevron-double-right" />
          </svg>        
      }
    </div>
  );

  return (
    <div id="blog-post">
      <Layout switchLang={switchLang}>

        {postsNavigation(pageContext)}
              
        <div className="header">
          <time dateTime={frontmatter.date}>{frontmatter.date}</time>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.author}</h2>
          <div className="keywords">
            {frontmatter.keywords
              .split(" ")
              .map( (keyword, i) => (
                <span key={i}>{keyword}</span>
              ))}
          </div>
        </div>

        <article dangerouslySetInnerHTML={{ __html: html }} />
        
      </Layout>
    </div>
  );
};

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MM.DD.YYYY")
        title
        keywords
        description
        author
      }
    }
  }
`

export default Template;