/* Internal */
import * as styles from './Heading3.scss'

interface Heading3Props {
  children: string
}

export default function Heading3({
  children,
}: Heading3Props) {
  return (
    <a
      href={`#${children}`}
      className={styles.linkWrapper}
    >
      <h3
        id={children}
        className={styles.heading3}
      >
        { children }
      </h3>
    </a>
  )
}
