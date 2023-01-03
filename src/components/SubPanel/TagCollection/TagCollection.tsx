/* External */
import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

/* Internal */
import { TagQueryResult } from '@commons/types/QueryType'
import { changeAllMdxToTagCollection } from '@utils/tag.utils'
import TagItem from './TagItem'
import * as styles from './TagCollection.scss'

function TagCollection() {
  const data = useStaticQuery<TagQueryResult>(
    graphql`
      query {
        allMdx {
          nodes {
            frontmatter {
              tags
            }
          }
        }
      }
    `
  )

  const tags = useMemo(() => changeAllMdxToTagCollection(data), [data])

  return (
    <div className={styles.itemsWrapper}>
      { tags.map(TagItem) }
    </div>
  )
}

export default TagCollection
