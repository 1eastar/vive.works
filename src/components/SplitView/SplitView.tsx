/* External */
import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import classNames from "classnames"

/* Internal */
import useResizeObserver from "@hooks/useResizeObserver.hook"
import { isBrowser } from "@utils/browser.utils"
import Resizer from "./Resizer"
import {
  MAX_SUB_VIEW_SIZE,
  MIN_SUB_VIEW_SIZE,
  INITIAL_SIZES,
  RESIZER_WIDTH,
  MOBILE_SCREEN_MAX_WIDTH,
} from "./SplitView.constant"
import * as styles from './SplitView.scss'

const noop = () => {}

interface SplitViewProps {
  children: JSX.Element[]
  onDragStart?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  onDragging?: (sizes: number[]) => void
  initialResizerPos?: number
}

function SplitView({
  children,
  initialResizerPos = 300,
  onDragStart = noop,
  onDragEnd = noop,
  onDragging = noop,
}: SplitViewProps) {
  const cachedSizes = useRef<number[]>([])
  const [wrapperRect, setWrapperRect] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [sizes, setSizes] = useState<number[]>(INITIAL_SIZES)

  useEffect(() => {
    // INITIAL_SIZES는 flick 방지를 위한 임시 sizes
    if (isBrowser) {
      setSizes([initialResizerPos, document.documentElement.clientWidth - initialResizerPos])
    }
  }, [])

  const wrapperRef = useResizeObserver((entry: ResizeObserverEntry) => {
    setWrapperRect(entry.contentRect ?? {})
  })

  const _onDragStart: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizes.current = sizes
    setIsDragging(true)
    onDragStart(e)
  }, [onDragStart, sizes])

  const _onDragEnd: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizes.current = sizes
    setIsDragging(false)
    onDragEnd?.(e)
  }, [onDragEnd, sizes])

  const _onDragging: MouseEventHandler<HTMLDivElement> = (e) => {
    const curPositionX = e.pageX
    const diffX = curPositionX - sizes[0]

    const nextSizes = [...sizes]

    if (curPositionX < MIN_SUB_VIEW_SIZE) {
      nextSizes[0] = MIN_SUB_VIEW_SIZE
      nextSizes[1] = wrapperRect['width'] - MIN_SUB_VIEW_SIZE
    } else if (curPositionX > MAX_SUB_VIEW_SIZE) {
      nextSizes[0] = MAX_SUB_VIEW_SIZE
      nextSizes[1] = wrapperRect['width'] - MAX_SUB_VIEW_SIZE
    } else {
      nextSizes[0] += diffX
      nextSizes[1] -= diffX
    }

    setSizes(nextSizes)
    onDragging?.(nextSizes)
  }

  /* for performance, use 'sizesForPerformance' instead of 'sizes' */
  // const sizesForPerformance = isDragging ? cachedSizes.current : sizes

  const renderStyledChild = useCallback((childNode: JSX.Element, childIndex: number) => (
    React.cloneElement(childNode, {
      style: { flexBasis: sizes[childIndex] }
    })
  ), [sizes])

  if (wrapperRect['width'] <= MOBILE_SCREEN_MAX_WIDTH) {
    return children[1]
}

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.viewWrapper, {
        [styles.dragging]: isDragging,
      })}
    >
      { children.map(renderStyledChild) }

      <Resizer
        className={styles.resizer}
        onDragStart={_onDragStart}
        onDragEnd={_onDragEnd}
        onDragging={_onDragging}
        style={{
          transform: `translateX(${(sizes[0]) - RESIZER_WIDTH / 2}px)`,
        }}
      />
    </div>
  )
}

export default SplitView
