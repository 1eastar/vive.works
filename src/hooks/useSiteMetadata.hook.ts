import { graphql, useStaticQuery } from "gatsby"

export interface SiteMetadataQueryResult {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      image: string
      siteUrl: string
    }
  }
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<SiteMetadataQueryResult>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            siteUrl
          }
        }
      }
  `)

  return data
}