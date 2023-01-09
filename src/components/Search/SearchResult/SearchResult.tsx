/* External */
import { useMemo } from 'react'
import { connectHits } from 'react-instantsearch-dom'

/* Internal */
import Hit, { Hit as HitAttr } from './Hit'
import Loader from './Loader'
import * as styles from './SearchResult.scss'

interface SearchResultProps {
  hits: HitAttr[]
}

function SearchResult({ hits }: SearchResultProps) {

  const renderHits = useMemo(() => {
    if (hits.length > 0) {
      return hits.map(hit => (
        <Hit
          key={hit.objectID}
          hit={hit}
        />
      ))
    }
    return (
      <div className={styles.noPost}>
        No Post
      </div>
    )
  }, [hits])

  return (
    <Loader>
      { renderHits }
    </Loader>
  )
}

export default connectHits(SearchResult)
