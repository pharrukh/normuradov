import React from "react";
import { Link, graphql } from "gatsby";

import "./blogPost.scss";

const Template = ({ data }) => {
  const {frontmatter, html} = data.markdownRemark;

  return (
    <div id="blog-post">
      <main>
        <Link to="/">Go Back</Link>
        <div className="header">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.author}, {frontmatter.date}</h2>
          <div className="keywords">
            {frontmatter.keywords
              .split(" ")
              .map( (keyword, i) => (
                <span key={i}>{keyword}</span>
              ))}
          </div>
        </div>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    </div>
  );
};

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        keywords
        description
        author
      }
    }
  }
`

export default Template;