/* Internal */
import * as styles from './Image.scss'

interface ImageProps {
  alt: string
  src: string
}

function Image({ alt, src }: ImageProps) {
  return (
    <div className={styles.wrapper}>
      <img
        alt={alt}
        src={src}
      />
    </div>
  )
}

export default Image
