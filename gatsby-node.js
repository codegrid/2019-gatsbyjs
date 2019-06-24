const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const sources = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
    const outputPath = path.join("/posts", node.frontmatter.slug)
    actions.createPage({
      path: outputPath,
      component: path.resolve(__dirname, "./src/templates/PostTemplate.js"),
      context: {
        id: node.id,
      },
    })
  })

  const limit = 3
  const numberOfPages = Math.ceil(posts.length / limit)
  const pagePaths = Array.from({ length: numberOfPages }).map(
    (_, pageNumber) => {
      return pageNumber === 0
        ? "/posts"
        : path.join("/posts", "page", `${pageNumber + 1}`)
    }
  )
  pagePaths.forEach((pagePath, pageNumber) => {
    const skip = pageNumber * limit
    actions.createPage({
      path: pagePath,
      component: path.resolve(__dirname, "./src/templates/PostListTemplate.js"),
      context: {
        skip,
        limit,
        numberOfPages,
        pagePaths,
        pageNumber,
      },
    })
  })
}
