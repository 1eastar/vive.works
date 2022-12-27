/* Internal */
import * as styles from './Italic.scss'

interface ItalicProps {
  children: React.ReactNode
}

export default function Italic({ children }: ItalicProps) {
  return (
    <span className={styles.italic}>{ children }</span>
  )
}