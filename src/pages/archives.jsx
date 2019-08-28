import React, { useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import SEO from "../components/seo";
import Layout from "components/Layout/layoutMain/LayoutMain";

import NoPostsMessage from "components/noPostsMessage/NoPostsMessage";

import "styles/pages/archives.scss";

const ArchivesPage = props => {

  // need during build time...
  const isBrowser = typeof window !== `undefined`;

  // language "state" of the page
  const [ language, switchLang ] = useState(
    (isBrowser) ?
      localStorage.getItem("lastChosenLang") ||
      document.documentElement.getAttribute("lang") ||
      "en" : ""
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

  const { allMarkdownRemark: { group: queryData } } = useStaticQuery(graphql`
    query BlogArchivesQuery {
      allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "post"}}},
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        group(field: frontmatter___lang) {
          fieldValue
          edges {
            node {
              id
              html
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
  // the difference from IndexPage -> objects has html and id
  const postsData = Object.assign({}, ...queryData.map(group => (
    {
      [group.fieldValue]: group.edges.map(
        edge => Object.assign({}, ...[
          edge.node.frontmatter,
          { html: edge.node.html },
          { id: edge.node.id } 
        ])
      )
    }
  )));

  const posts = postsData => (
    < >
    {postsData[language].map( post => (
        <div className="post" key={post.id}>
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
      <SEO title="Archives" />
      {(postsData[language]) ? posts(postsData) : <NoPostsMessage />}
    </Layout>
  );
}

export default ArchivesPage;
