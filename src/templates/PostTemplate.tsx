/* External */
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types'

/* Internal */
import { PostTemplateQueryResult } from '@commons/types/QueryType'
import Seo from '@components/Seo'
import Layout from '@components/Layout'
import PostHead from '@components/PostHead'
import Utterance from '@components/Utterance'
import * as Tags from './tags'
import * as styles from './PostTemplate.scss'

const tagComponents: MDXComponents = {
  p: Tags.Paragraph,
  h1: Tags.Heading,
  h2: Tags.Heading2,
  h3: Tags.Heading3,
  code: Tags.InlineCode,
  strong: Tags.Bold,
  em: Tags.Italic,
  hr: Tags.Horizon,
  a: Tags.Anchor,
  blockquote: Tags.BlockQuote,
  ol: Tags.OrderedList,
  ul: Tags.UnorderedList,
  pre: Tags.CodeBlock,
  // ...Tags,
}

interface PostTemplateProps extends PostTemplateQueryResult {
  children: any
}
    
const PostTemplate = ({ data, children }: PostTemplateProps) => {
  const { mdx } = data
  const {
    frontmatter: {
      title,
      description,
      author,
      date,
      image,
    },
    fields: {
      timeToRead: {
        text,
      },
    },
  } = mdx

  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        author={author}
        date={date}
        image={image}
      />
      <PostHead 
        {...mdx.frontmatter}
        timeToRead={text}
      />
      <div className={styles.MDXcontent}>
        <MDXProvider components={tagComponents}>
          {children}
        </MDXProvider>
        <Utterance />
      </div>
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
        tags
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
