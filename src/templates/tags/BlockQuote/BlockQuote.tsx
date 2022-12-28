/* Internal */
import * as styles from './BlockQuote.scss'

interface BlockQuoteProps {
  children: React.ReactNode
}

export default function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.quoteLine} />
      <div className={styles.quote}>
        { children }
      </div>
    </div>
  )
}