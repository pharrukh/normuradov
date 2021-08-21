import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import SEO from "components/seo"
import Layout from "components/Layout/layoutMain/LayoutMain"
import pageState from "components/pageState"
import "./blogPost.scss"
import GDPR from "components/GDPR/GDPR"
import { getCookieValue } from '../../services/cookie'

const Template = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark
  const [language, switchLang] = useState("en")

  useEffect(() => pageState(switchLang))

  const gdprCheck = () => {
    const isBrowser = typeof window !== `undefined`
    const isGAEnabled = getCookieValue(document, 'user-decided')
    if (isBrowser && !isGAEnabled) {
      return <GDPR />
    }
  }

  const postsNavigation = ({ prev, next }) => (
    <div className="nav-posts">
      {prev ? (
        <Link to={prev}>
          <svg>
            <use href="#icon-chevron-double-left" />
          </svg>
        </Link>
      ) : (
        <svg className="nav-empty">
          <use href="#icon-chevron-double-left" />
        </svg>
      )}
      <Link to="/">
        <svg>
          <use href="#icon-home-round" />
        </svg>
      </Link>
      {next ? (
        <Link to={next}>
          <svg>
            <use href="#icon-chevron-double-right" />
          </svg>
        </Link>
      ) : (
        <svg className="nav-empty">
          <use href="#icon-chevron-double-right" />
        </svg>
      )}
    </div>
  )

  return (
    <div id="blog-post">
      <div className="gdpr-modal">{gdprCheck()}</div>
      <Layout switchLang={switchLang}>
        <SEO title={frontmatter.title} />
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </div>
  )
}

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

export default Template
