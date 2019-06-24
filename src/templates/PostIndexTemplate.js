import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 50)
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            author
            slug
          }
        }
      }
    }
  }
`

export default function(props) {
  const posts = props.data.allMarkdownRemark
  return (
    <Layout>
      {posts.edges.map(({ node }) => (
        <div>
          <Link to={`/posts/${node.frontmatter.slug}`}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
          <div>
            <span>投稿日: {node.frontmatter.date}</span>
            <br />
            <span>投稿者: {node.frontmatter.author}</span>
            <p>{node.excerpt}</p>
          </div>
        </div>
      ))}
    </Layout>
  )
}
