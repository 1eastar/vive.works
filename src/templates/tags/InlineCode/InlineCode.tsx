// Ext
import { ReactNode } from 'react'

// Int
import * as styles from './InlineCode.scss'

interface InlineCodeProps {
  children: ReactNode
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
