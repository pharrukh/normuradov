/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// absolute modules exports
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

// creting pages from .md files
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/BlogPost/BlogPost.js");

  const result = await graphql(`
  {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}},
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      group(field: frontmatter___lang, limit: 5) {
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

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const langGroupedPosts = result.data.allMarkdownRemark.group;
  // const posts = result.data.allMarkdownRemark.edges;

  langGroupedPosts.forEach(group => {
    const posts = group.edges;
    posts.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          prev: (index === 0) ? null : posts[index - 1].node.frontmatter.path,
          next: (index === posts.length - 1) ? null : posts[index + 1].node.frontmatter.path
        },
      })
    }) 
  });     
  
}