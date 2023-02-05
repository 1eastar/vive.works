/* External */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import classNames from 'classnames'

/* Internal */
import { getValueFromQueryString, isBrowser } from '@utils/browser.utils'
import ClearIcon from '-!svg-react-loader!@statics/icons/close.svg'
import * as styles from './SearchBox.scss'

interface SearchBoxProps {
  currentRefinement: string
  refine: (value: string) => void
}

function SearchBox({
  currentRefinement,
  refine,
}: SearchBoxProps) {
  const queryParams = isBrowser ? window.location.search : ''

  const [focused, setFocused] = useState(false)

  const clearQuery = useCallback(() => {
    refine('')
  }, [refine])

  useEffect(() => {
    const tag = getValueFromQueryString(queryParams, 'tag')
    
    if (tag) refine(tag) 
    else clearQuery()
  }, [queryParams, clearQuery, refine])

  const onChangeQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value)
  }, [refine])


  const handleFocus = useCallback((isFocus: boolean) => () => {
    setFocused(isFocus)
  }, [])

  const renderClearIcon = useMemo(() => (
    <div
      className={styles.clear}
      onClick={clearQuery}
      data-testid="clear"
    >
      <ClearIcon />
    </div>
  ), [clearQuery])

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
      { renderClearIcon }
    </div>
  )
}

export default connectSearchBox(SearchBox)
