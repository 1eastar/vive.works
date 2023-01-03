const indexName = `Posts`

const pageQuery = `{
  posts: allMdx {
    nodes {
      objectID: id
      frontmatter {
        title
        slug
        image
        description
        date(formatString: "MMMM DD, YYYY")
        author
        tags
      }
      excerpt(pruneLength: 5000)
      internal {
        contentDigest
      }
    }
  }
}`

function convertPageToAlgoliaRecord({ frontmatter, ...rest }) {
  return {
    ...frontmatter,
    ...rest,
  }
}

module.exports = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.posts.nodes.map(convertPageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
