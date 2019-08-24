import React, { useEffect } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {

  const setTheme = () => {
    const theme = localStorage.getItem("lastChosenTheme");
    (theme)
      ? document.documentElement.setAttribute("data-theme", theme)
      : document.documentElement.setAttribute("data-theme", "light")
  }

  useEffect(setTheme);

  return (
    <Layout>
      <SEO title="Home" />
      {data.allMarkdownRemark.edges.map(post => (
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

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            path
            date(formatString: "YYYY-MM-DD")
            title
            keywords
            description
            author
          }
        }
      }
    }
  }
`

export default IndexPage;
