import React, { useLayoutEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import SEO from "components/seo"
import Layout from "components/Layout/layoutMain/LayoutMain"
import GDPR from "components/GDPR/GDPR"
import NoPostsMessage from "components/noPostsMessage/NoPostsMessage"

import pageState from "components/pageState"

import "styles/pages/index.scss"

const IndexPage = props => {
  // language "state" of the page
  const [language, switchLang] = useState("en")

  // update the settings upon refreshing
  useLayoutEffect(() => pageState(switchLang))

  // quering the data from .md files to get posts menu
  // -> we need .md with type="post" frontmatter
  // -> queried data become sorted, latest posts comes first
  // -> each language comes as a group
  // -> each group is limited to 5 latest posts
  const {
    allMarkdownRemark: { group: queryData },
  } = useStaticQuery(graphql`
    query BlogIndexQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "post" } } }
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
  `)

  // data to be used properly, becomes:
  // posts = { lang: [ post, post, ... ], ... }
  const posts = Object.assign(
    {},
    ...queryData.map(group => ({
      [group.fieldValue]: group.edges.map(edge => edge.node.frontmatter),
    }))
  )

  const renderPosts = () => (
    <>
      {posts[language].map((post, i) => (
        <div className="post" key={i}>
          <time dateTime={post.date}>{post.date}</time>
          <Link to={post.path}>{post.title}</Link>
        </div>
      ))}
    </>
  )

  const gdprCheck = () => {
    const isBrowser = typeof window !== `undefined`
    if (isBrowser && localStorage.getItem("GA-allowance") !== "allow") {
      return <GDPR />
    }
  }

  return (
    <>
      <div className="gdpr-modal">{gdprCheck()}</div>
      <Layout switchLang={switchLang}>
        <SEO title="Home" />
        {posts[language] ? renderPosts() : <NoPostsMessage />}
      </Layout>
    </>
  )
}

export default IndexPage
