/* External */
import React from 'react'

/* Internal */
import * as styles from './InlineCode.scss'

interface InlineCodeProps {
  children: React.ReactNode
}

export default function InlineCode({
  children
}: InlineCodeProps) {
  return (
    <pre className={styles.inlineCode}>
      { children }
    </pre>
  )
}
