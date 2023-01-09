/* External */
import { useCallback, useEffect, useRef } from 'react'

/* Internal */

type IntersectHandler = (entry: Element) => void

type EntryContainerType = {
  [key: string]: IntersectionObserverEntry
}

function useIntersectionObserver(
  setIntersectTitle?: IntersectHandler,
  options?: IntersectionObserverInit  // eslint-disable-line no-undef
) {
  const entryContainer = useRef<EntryContainerType>({})
  
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        entryContainer.current[entry.target.id] = entry
      })
      
      const visibleEntries = Object.values(entryContainer.current).filter(entry => entry.isIntersecting)
      if (visibleEntries.length !== 0) {
        setIntersectTitle(visibleEntries[0].target)
      }
  }, [setIntersectTitle])

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'))
    headingElements.forEach(element => observer.observe(element))
    
    return () => observer.disconnect()
  }, [options, callback]) 
}

export default useIntersectionObserver
