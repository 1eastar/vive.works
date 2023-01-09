/* External */
import React from 'react'

/* Internal */
import * as styles from './Anchor.scss'

interface AnchorProps {
  href: string
  children: React.ReactNode
}

export default function Anchor({ href, children }: AnchorProps) {
  return (
    <a
      className={styles.anchor}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      { children }
    </a>
  )
}