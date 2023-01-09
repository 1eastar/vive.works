/* External */
import { useMemo, useCallback } from 'react'
import { navigate } from 'gatsby'
import classNames from 'classnames'

/* Internal */
import { Tag } from '@utils/tag.utils'
import { getQueryParamValue } from '@utils/browser.utils'
import * as styles from './TagItem.scss'

function TagItem(tag: Tag) {
  const isCurrentTag = useMemo(() => {
    const currentTagText = getQueryParamValue(window.location.search, 'tag')

    if (currentTagText) {
      return tag.text === currentTagText.replace('#', '').trim()
    } else {
      return tag.text === 'All'
    }
  }, [tag, window.location.search])
  
  const onClickItem = useCallback(() => {
    if (tag.text === 'All') {
      navigate('/')
    } else {
      navigate(`?tag=${encodeURIComponent(`#${tag.text}`)}`)
    }
  }, [tag])

  return (
    <div
      onClick={onClickItem}
      className={classNames(styles.tagItem, {
        [styles.current]: isCurrentTag,
      })}
    >
      #&nbsp;{ tag.text } &nbsp; ({ tag.count })
    </div>
  )
}

export default TagItem
