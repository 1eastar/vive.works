/* External */
import { useCallback, useEffect, useRef } from 'react';

type CallbackProps = (
  entry?: ResizeObserverEntry,
  observer?: ResizeObserver,
) => void

function useResizeObserver(callback: CallbackProps) {
  const ref = useRef<HTMLDivElement>(null)

  const ROCallback = useCallback((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    entries.forEach(entry => callback(entry, observer))
  }, [callback])

  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(ROCallback)
    resizeObserver.observe(ref.current!)

    return () => {
        resizeObserver.disconnect()
    }
  }, [ROCallback, ref])

  return ref
}

export default useResizeObserver
