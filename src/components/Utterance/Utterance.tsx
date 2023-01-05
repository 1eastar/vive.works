/* External */
import { memo, useLayoutEffect, useRef } from 'react'

/* Internal */
import * as styles from './Utterance.scss'

const attributes = {
  src: 'https://utteranc.es/client.js',
  repo: '1eastar/utterance',
  theme: 'preferred-color-scheme',
  'issue-term': 'pathname',
  label: 'comments/vive.log',
  crossOrigin: 'anonymous',
  async: 'true',
}

function Utterances() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const utterances = document.createElement('script')

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    containerRef.current!.appendChild(utterances)
  }, [])

  return (
    <div
      ref={containerRef}
      className={styles.utterance}
    />
  )
}

export default memo(Utterances)
