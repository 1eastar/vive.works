/* External */
import classNames from 'classnames'
import { navigate } from 'gatsby'
import { MouseEvent, useCallback } from 'react'

/* Internal */
import * as styles from './PostTag.scss'

interface PostTagProps {
  classname?: string
  value: string
  clickEnabled?: boolean
}

function PostTag({
  classname,
  value,
  clickEnabled,
}: PostTagProps) {

  const onClickTag = useCallback((e: MouseEvent) => {
    if (clickEnabled) {
      e.stopPropagation()
      const encodedTag = encodeURIComponent(`#${value}`)
      navigate(`/?tag=${encodedTag}`)
    }
  }, [navigate, clickEnabled])

  return (
    <div
      onClick={onClickTag}
      key={value}
      className={classNames(styles.tag, classname, {
        [styles.clickEnabled]: clickEnabled,
      })}
    >
      # {value}
    </div>
  )
}

export default PostTag
