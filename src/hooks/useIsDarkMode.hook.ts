/* External */
import { useCallback, useEffect, useState } from 'react'

/* Internal */
import { isBrowser } from '@utils/browser.utils'

const MediaQueryList = isBrowser && window.matchMedia('(prefers-color-scheme: dark)')

export default function useIsDarkMode() {
  if (!MediaQueryList) { return false }

  const [isDarkMode, setIsDarkMode] = useState(MediaQueryList.matches)

  const handleChangeColorScheme = useCallback((e: MediaQueryListEvent) => {
    setIsDarkMode(e.matches)
  }, [])

  useEffect(() => {
    // 웹 접근 후 dark/light mode를 수정할 때 바로 적용해주기 위한 event listener
    MediaQueryList.addEventListener('change', handleChangeColorScheme)

    return () => {
      MediaQueryList.removeEventListener('change', handleChangeColorScheme)
    }
  }, [])

  return isDarkMode
}
