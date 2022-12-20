import * as styles from './Heading.scss'

interface HeadingProps {
  children: string
}

export default function Heading({
  children,
}: HeadingProps) {
  return (
    <a
      href={`#${children}`}
      className={styles.linkWrapper}
    >
      <h1
        id={children}
        className={styles.heading1}
      >
        { children }
      </h1>
    </a>
  )
}
