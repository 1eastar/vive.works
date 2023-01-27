/* External */
import React from 'react'

/* Internal */
import * as styles from './HeadingLink.scss'

interface HeadingLinkProps {
  href: string
  children: React.ReactNode
}

export default function HeadingLink({ href, children }: HeadingLinkProps) {
  return (
    <a
      className={styles.headingLink}
      href={href}
    >
      { children }
    </a>
  )
}
