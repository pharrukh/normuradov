import React, { useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "components/Layout/layoutMain/LayoutMain";
import SEO from "../components/seo";

const IndexPage = (props) => {

  const [ language, switchLang ] = useState("en");

  const setPageSettings = () => {
    const theme = localStorage.getItem("lastChosenTheme");
    const lang = localStorage.getItem("lastChosenLang");

    (theme)
      ? document.documentElement.setAttribute("data-theme", theme)
      : document.documentElement.setAttribute("data-theme", "light");

    (lang)
      ? document.documentElement.setAttribute("lang", lang)
      : document.documentElement.setAttribute("lang", "en");
  }

  useEffect(setPageSettings);

  const data = useStaticQuery(graphql`
    query BlogIndexQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
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
  `);

  return (
    <Layout switchLang={switchLang} >
      <SEO title="Home" />
      {data.allMarkdownRemark.edges
        .filter(post => post.node.frontmatter.lang === language)
        .map(post => (
        <div className="post" key={post.node.id}>
          <time dateTime={post.node.frontmatter.date}>
            {post.node.frontmatter.date}
          </time>
          <Link to={post.node.frontmatter.path}>
            {post.node.frontmatter.title}
          </Link>
        </div>
      ))}
    </Layout>
  );
  
}

export default IndexPage;
