/* External */
import { useCallback, useMemo, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/* Internal */
import { changeMdxToTOCItems, findCurrentMDX } from '@utils/TOC.utils'
import { TOCQueryResult } from '@commons/types/QueryType'
import useIntersectionObserver from '@hooks/useIntersectionObserver.hook'
import TOCItem from './TOCItem'
import * as styles from './TOC.scss'

function TOC() {
  const [currentHeading, setCurrentHeading] = useState<Element>()

  const queryData = useStaticQuery<TOCQueryResult>(
    graphql`
      query {
        allMdx {
          nodes {
            body
            frontmatter {
              slug
            }
          }
        }
      }
    `
  )

  const setIntersectTitle = useCallback((target: Element) => setCurrentHeading(target), [])

  useIntersectionObserver(setIntersectTitle, { rootMargin: '0px 0px -60%' })

  const TOCItemList = useMemo(() => {
    const currentMDX = findCurrentMDX(queryData)
    return currentMDX ? changeMdxToTOCItems(currentMDX) : []
  }, [queryData])

  return (
    <div className={styles.TOCItemWrapper}>
      { TOCItemList.map(item => (
        <TOCItem
          key={item.title}
          item={item}
          currentHeading={currentHeading}
        />
      )) }
    </div>
  )
}

export default TOC
