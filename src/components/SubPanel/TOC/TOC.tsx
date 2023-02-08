/* External */
import { useCallback, useMemo, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/* Internal */
import { isBrowser } from '@utils/browser.utils'
import { getTOCfromMDX, findCurrentMDX } from '@utils/TOC.utils'
import { TOCQueryResult } from '@commons/types/QueryType'
import useIntersectionObserver from '@hooks/useIntersectionObserver.hook'
import TOCItem from './TOCItem'
import * as styles from './TOC.scss'

function TOC() {
  const pathname = isBrowser ? window.location.pathname : ''
  
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
    const currentMDX = findCurrentMDX(queryData, pathname)
    return currentMDX ? getTOCfromMDX(currentMDX) : []
  }, [queryData, pathname])

  return (
    <div
      className={styles.TOCItemWrapper}
      data-testid='TOC-container'
    >
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
