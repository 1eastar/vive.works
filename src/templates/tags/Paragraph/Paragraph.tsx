import * as styles from './Paragraph.scss'

interface ParagraphProps {
  children: string
}
export default function Paragraph({
  children,
}: ParagraphProps) {
  return (
    <p className={styles.pwrapper}>
      { children }
    </p>
  )
}
