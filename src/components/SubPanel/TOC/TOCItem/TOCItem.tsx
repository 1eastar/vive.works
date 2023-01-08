/* External */
import { useMemo } from "react"
import classNames from "classnames"

/* Internal */
import * as styles from './TOCItem.scss'

export interface TOCItem {
  title: string
  level: number
}

interface TOCItemProps {
  item: TOCItem
  currentHeading: Element
}

function TOCItem({
 item,
 currentHeading,
}: TOCItemProps) {

  const isCurrentHeading = useMemo(() =>
    !!currentHeading && currentHeading.innerHTML == item.title
  , [currentHeading, item])

  return (
    <a
      className={classNames(styles.TOCItem, {
        [styles.current]: isCurrentHeading,
      })}
      href={`#${item.title}`}
    >
      { "  ".repeat(item.level).replace(/ /g, "\u00a0") } { item.title }
    </a>
  )
}

export default TOCItem