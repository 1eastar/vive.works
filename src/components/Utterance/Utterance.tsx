/* External */
import useIsDarkMode from '@hooks/useIsDarkMode.hook'
import { memo, useLayoutEffect, useRef } from 'react'

/* Internal */
import { utteranceAttributes } from '@commons/constants/Utterance.constant'
import * as styles from './Utterance.scss'

function Utterances() {
  const isDarkMode = useIsDarkMode()

  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    containerRef.current.innerHTML = null
    const utterances = document.createElement('script')

    utteranceAttributes['theme'] = isDarkMode ? 'github-dark' : 'github-light'

    Object.entries(utteranceAttributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    containerRef.current.appendChild(utterances)
  }, [isDarkMode])

  return (
    <div
      ref={containerRef}
      className={styles.utterance}
    />
  )
}

export default memo(Utterances)
