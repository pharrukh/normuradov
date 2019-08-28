import React, { useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "components/Layout/layoutMain/LayoutMain";
import SEO from "../components/seo";

import NoPostsMessage from "components/noPostsMessage/NoPostsMessage";

const IndexPage = (props) => {

  // language "state" of the page
  const [ language, switchLang ] = useState(
    localStorage.getItem("lastChosenLang") ||
    document.documentElement.getAttribute("lang") ||
    "en"
  );

  // setting language and theme of the page
  const setPageSettings = () => {
    const theme = localStorage.getItem("lastChosenTheme") || "light";
    const lang = localStorage.getItem("lastChosenLang") || "en";

    document.documentElement.setAttribute(
      "data-theme", theme
    );

    document.documentElement.setAttribute(
      "lang", lang
    );
  }

  // update the settings upon refreshing
  useEffect(setPageSettings);

  // quering the data from .md files to get posts menu
  // -> we need .md with type="post" frontmatter
  // -> queried data become sorted, latest posts comes first
  // -> each language comes as a group
  // -> each group is limited to 5 latest posts
  const { allMarkdownRemark: { group: queryData } } = useStaticQuery(graphql`
    query BlogIndexQuery {
      allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "post"}}},
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        group(field: frontmatter___lang, limit: 5) {
          fieldValue
          edges {
            node {
              id
              frontmatter {
                path
                date(formatString: "YYYY-MM-DD")
                lang
                title
                keywords
                description
                author
              }
            }
          }
        }
      }
    }
  `);

  // data to be used properly, becomes:
  // posts = { lang: [ post, post, ... ], ... }
  const posts = Object.assign({}, ...queryData.map(group => (
    { [group.fieldValue]: group.edges.map(edge => edge.node.frontmatter) }
  )));

  const renderPosts = () => (
    < >
    {posts[language].map( (post, i) => (
        <div className="post" key={i}>
          <time dateTime={post.date}>
            {post.date}
          </time>
          <Link to={post.path}>
            {post.title}
          </Link>
        </div>
      ))}
    </>
  );

  return (
    <Layout switchLang={switchLang} >
      <SEO title="Home" />
      {
        (posts[language]) ? renderPosts() : <NoPostsMessage />
      }      
    </Layout>
  );
  
}

export default IndexPage;
