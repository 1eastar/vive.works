/* External */
import React from 'react'

/* Internal */
import * as styles from './UnorderedList.scss'

interface UnorderedListProps {
  children: React.ReactNode
}

export default function UnorderedList({ children }: UnorderedListProps) {
  return (
    <ul className={styles.unorderedList}>
      { children }
    </ul>
  )
}