/* External */
import React from 'react'

/* Internal */
import * as styles from './Bold.scss'

interface BoldProps {
  children: React.ReactNode
}

export default function Bold({ children }: BoldProps) {
  return (
    <span className={styles.bold}>{ children }</span>
  )
}