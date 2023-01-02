/* External */
import React, { useCallback, useEffect, useState } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import classNames from 'classnames'

/* Internal */
import { getQueryParamValue } from "@utils/browser.utils"
import CloseIcon from '-!svg-react-loader!@statics/icons/close.svg'
import * as styles from './SearchBox.scss'

interface SearchBoxProps {
  currentRefinement: string
  refine: (value: string) => void
}

function SearchBox({
  currentRefinement,
  refine,
}: SearchBoxProps) {
  const [focused, setFocused] = useState(false)

  const clearQuery = useCallback(() => {
    refine('')
  }, [refine])

  useEffect(() => {
    const tag = getQueryParamValue(window.location.search, 'tag')
    
    if (!!tag) refine(tag) 
    else clearQuery()
  }, [window.location.search, clearQuery, refine])

  const onChangeQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value)
  }, [refine])


  const handleFocus = useCallback((isFocus: boolean) => () => {
    setFocused(isFocus)
  }, [])

  return (
    <div className={classNames(styles.wrapper, {
      [styles.onFocus]: focused,
    })}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onChangeQuery}
        value={currentRefinement}
        autoFocus={false}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
      />
      <div
        className={styles.clear}
        onClick={clearQuery}
      >
        <CloseIcon />
      </div>
    </div>
  )
}

export default connectSearchBox(SearchBox)
