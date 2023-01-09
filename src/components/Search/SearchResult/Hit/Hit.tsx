/* External */
import { useCallback } from 'react'
import { navigate } from 'gatsby'

/* Internal */
import PostTag from '@components/PostTag'
import * as styles from './Hit.scss'

export interface Hit {
  author: string
  date: string
  description: string
  excerpt: string
  image: string
  internal: {
    contentDigest: string
  }
  objectID: string
  slug: string
  title: string
  tags: string[]
}

export interface HitProps {
  hit: Hit
}

function HitComponent({ hit }: HitProps) {

  const onClickHit = useCallback(() => {
    navigate(hit.slug)
  }, [hit])

  return (
    <div
      onClick={onClickHit}
      className={styles.hitContainer}
    >
      <div className={styles.date}>
        { hit.date }
      </div>
      <div className={styles.title}>
        { hit.title }
      </div>
      <div className={styles.description}>
        { hit.description }
      </div>
      <div className={styles.tags}>
        { hit.tags.map(tag => <PostTag key={tag} classname={styles.tag} value={tag} />) }
      </div>
    </div>
  )
}

export default HitComponent
