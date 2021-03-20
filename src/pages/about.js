import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import SEO from "components/seo"
import Layout from "components/Layout/layoutMain/LayoutMain"

import pageState from "components/pageState"

import "styles/pages/about.scss"

const About = () => {
  const [language, switchLang] = useState("en")

  useEffect(() => pageState(switchLang))

  const {
    allMarkdownRemark: { edges: data },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "asset-about" } } }
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
  `)

  const pages = {}
  data.forEach(document => {
    pages[document.node.frontmatter.lang] = {
      title: document.node.frontmatter.title,
      html: document.node.html,
    }
  })

  return (
    <div id="about-page">
      <SEO title="About" />
      <Layout switchLang={switchLang}>
        <article
          dangerouslySetInnerHTML={{ __html: pages[language].html }}
        ></article>
      </Layout>
    </div>
  )
}

export default About
