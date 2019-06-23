const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const sources = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  if (sources.errors) return

  const posts = sources.data.allMarkdownRemark.edges
  posts.forEach(({ node }) => {
    const outputPath = path.join("posts", node.frontmatter.slug)
    actions.createPage({
      path: outputPath,
      component: path.resolve(__dirname, "./src/templates/postTemplate.js"),
      context: {
        id: node.id,
      },
    })
  })
}
