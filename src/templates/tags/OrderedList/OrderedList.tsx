/* External */
import React from 'react'

/* Internal */
import * as styles from './OrderedList.scss'

interface OrderedListProps {
  children: React.ReactNode
}

export default function OrderedList({ children }: OrderedListProps) {
  return (
    <ol className={styles.orderedList}>
      { children }
    </ol>
  )
}