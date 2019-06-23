import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        author
      }
    }
  }
`

export default function(props) {
  const post = props.data.markdownRemark
  const { frontmatter } = post
  return (
    <Layout>
      <article>
        <h2>{frontmatter.title}</h2>
        <div>
          <span>投稿日: {frontmatter.date}</span>
          <br />
          <span>投稿者: {frontmatter.author}</span>
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

