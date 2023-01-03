/* External */
import { useCallback, useMemo, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

/* Internal */
import { changeMdxToTOCItems, findCurrentMDX } from "@utils/TOC.utils"
import { TOCQueryResult } from "@commons/types/QueryType"
import useIntersectionObserver from "@hooks/useIntersectionObserver.hook"
import TOCItem from "./TOCItem"
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
    return changeMdxToTOCItems(currentMDX)
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

// 페이지 이동 시 split view sizes 유지가 안 됨. -> 그냥 안 돼도 되게 냅둬도 될 것 같기도..?
// 이상한 conflicting order 에러뜸 갑자기;;