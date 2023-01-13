/* External */
import { useMemo, useCallback } from 'react'
import { navigate } from 'gatsby'
import classNames from 'classnames'

/* Internal */
import { Tag } from '@utils/tag.utils'
import { getQueryParamValue, isBrowser } from '@utils/browser.utils'
import * as styles from './TagItem.scss'

function TagItem(tag: Tag) {
  const queryParams = isBrowser ? window.location.search : ''

  const isCurrentTag = useMemo(() => {
    const currentTagText = getQueryParamValue(queryParams, 'tag')

    if (currentTagText) {
      return tag.text === currentTagText.replace('#', '').trim()
    } else {
      return tag.text === 'All'
    }
  }, [tag, queryParams])
  
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
