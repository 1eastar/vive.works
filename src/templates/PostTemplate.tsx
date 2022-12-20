/* External */
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types'

/* Internal */
import Seo from '@components/Seo'
import Layout from '@components/Layout'
import * as Tags from './tags'

const tagComponents = {
  p: Tags.Paragraph,
  h1: Tags.Heading,
  code: Tags.InlineCode,

  h2: props => props.children,
  strong: props => props.children,
  em: props => props.children,
  blockquote: props => props.children,
  hr: props => props.children,
  a: props => props.children,
  ol: props => props.children,
  ul: props => props.children,
  pre: props => props.children,
  ...Tags,
} as MDXComponents

interface pageQueryResult {
  data: {
    mdx: {
      body: any
      frontmatter: {
        slug: string
        title: string
        description: string
        author: string
        date: string
        image: string
      }
      htmlAst: any
      fields: {
        timeToRead: {
          text: string
        }
      }
    }
  }
}

type PostTemplateProps = pageQueryResult & { children: any }
    
const PostTemplate = ({ data, children }: PostTemplateProps) => {
  const { mdx } = data
  const {
    body,
    frontmatter: {
      slug,
      title,
      description,
      author,
      date,
      image,
    },
    htmlAst,
    fields: {
      timeToRead: {
        text,
      },
    },
  } = mdx
console.log(data, 1111, children)
  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        author={author}
        date={date}
        image={image}
      />
      <MDXProvider components={tagComponents}>
        {children}
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        slug
        id
        title
        description
        author
        date(formatString: "YYYY-M-DD")
        image
      }
      fields {
        timeToRead {
          text
        }
      }
    }
  }
`

export default PostTemplate
