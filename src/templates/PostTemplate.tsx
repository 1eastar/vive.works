/* External */
import React, { memo } from 'react';
import { graphql } from 'gatsby';

/* Internal */
import { BaseTemplateProps } from '@commons/types/BaseTemplateType';
import Seo from '@components/Seo';
import Layout from '@components/Layout';
import { MDXProvider } from '@mdx-js/react';

// interface PostTemplateQueryResult {
//   data: {
//     mdx: {
//       body: any
//       frontmatter: {
//         path: string
//         title: string
//         description: string
//         author: string
//         date: string
//         image: string
//       }
//     }
//   }
// }
    
function PostTemplate({ data, children }) {
  return (
    <Layout>
        <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
            {/* {data.mdx.body} */}
        </code>
        <MDXProvider>
          {children}
        </MDXProvider>
    </Layout>
  )
}

// PostTemplate.displayName = 'PostTemplate'

export const query = graphql`
  query($id: String!) {
    mdx(frontmatter: { id: { eq: $id } }) {
      body
      frontmatter {
        path
        id
        title
        description
        author
        date
        image
      }
    }
  }
`

export default PostTemplate
