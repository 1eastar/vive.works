/* Internal */
import * as styles from './Heading2.scss'

interface Heading2Props {
  children: string
}

export default function Heading2({
  children,
}: Heading2Props) {
  return (
    <a
      href={`#${children}`}
      className={styles.linkWrapper}
    >
      <h2
        id={children}
        className={styles.heading2}
      >
        { children }
      </h2>
    </a>
  )
}
