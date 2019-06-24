const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const sources = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
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
      component: path.resolve(__dirname, "./src/templates/PostTemplate.js"),
      context: {
        id: node.id,
      },
    })
  })

  const postIndexTemplate = path.resolve(__dirname, "./src/templates/PostIndexTemplate.js")
  const limit = 3
  const numberOfPages = Math.ceil(posts.length / limit)
  for(let pageNumber = 0; pageNumber < numberOfPages; pageNumber++) {
    const skip = pageNumber * limit
    const pagePath = pageNumber === 0 ? "posts" : path.join("posts", "page", `${pageNumber + 1}`)
    actions.createPage({
      path: pagePath,
      component: postIndexTemplate,
      context: {
        skip,
        limit
      }
    })
  }
}
