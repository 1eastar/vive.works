/* External */
import { memo, useLayoutEffect, useRef } from 'react'

/* Internal */
import { utteranceAttributes } from './Utterance.constant'
import * as styles from './Utterance.scss'

function Utterances() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const utterances = document.createElement('script')

    Object.entries(utteranceAttributes).forEach(([key, value]) => {
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
