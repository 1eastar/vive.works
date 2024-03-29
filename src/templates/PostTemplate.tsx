/* External */
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types'
import '../../node_modules/katex/dist/katex.min.css'

/* Internal */
import { PostTemplateQueryResult } from '@commons/types/QueryType'
import Seo from '@components/Seo'
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
  img: Tags.Image,
  ...Tags,
}

interface PostTemplateProps extends PostTemplateQueryResult {
  children: any
}
    
const PostTemplate = ({ data, children }: PostTemplateProps) => {
  const { mdx } = data
  const {
    fields: {
      timeToRead: {
        text,
      },
    },
  } = mdx

  return (
    <>
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
    </>
  )
}

export const Head = ({ data }: PostTemplateQueryResult) => {
  const { mdx } = data
  const {
    frontmatter: {
      title,
      description,
      author,
      date,
      image,
      slug,
    },
  } = mdx
  return (
    <Seo
      title={title}
      description={description}
      author={author}
      date={date}
      image={image}
      slug={slug}
    />
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
        date(formatString: "YYYY-MM-DD")
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
