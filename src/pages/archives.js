import React, { useEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import SEO from "components/seo"
import Layout from "components/Layout/layoutMain/LayoutMain"
import NoPostsMessage from "components/noPostsMessage/NoPostsMessage"

import pageState from "components/pageState"

import "styles/pages/archives.scss"

const ArchivesPage = props => {
  const [language, switchLang] = useState("en")

  useEffect(() => pageState(switchLang), [])

  const {
    allMarkdownRemark: { group: queryData },
  } = useStaticQuery(graphql`
    query BlogArchivesQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "post" } } }
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
  `)

  // data to be used properly, becomes:
  // posts = { lang: [ post, post, ... ], ... }
  // the difference from IndexPage -> objects has html and id
  const postsData = Object.assign(
    {},
    ...queryData.map(group => ({
      [group.fieldValue]: group.edges.map(edge =>
        Object.assign(
          {},
          ...[
            edge.node.frontmatter,
            { html: edge.node.html },
            { id: edge.node.id },
          ]
        )
      ),
    }))
  )

  const posts = postsData => (
    <>
      {postsData[language].map(post => (
        <div className="post" key={post.id}>
          <time dateTime={post.date} >{post.date}</time>
          <Link to={post.path} className='title'>{post.title}
            <p>{post.description}</p></Link>
        </div>
      ))}
    </>
  )

  return (
    <Layout switchLang={switchLang}>
      <SEO title="Archives" />
      {postsData[language] ? posts(postsData) : <NoPostsMessage language={language} />}
    </Layout>
  )
}

export default ArchivesPage
