/* External */
import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'

/* Internal */
import useResizeObserver from '@hooks/useResizeObserver.hook'
import Resizer from './Resizer'
import {
  MAX_SUB_VIEW_SIZE,
  MIN_SUB_VIEW_SIZE,
  RESIZER_WIDTH,
  MOBILE_SCREEN_MAX_WIDTH,
} from './SplitView.constant'
import * as styles from './SplitView.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

interface SplitViewProps {
  children: JSX.Element[]
  onDragStart?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  onDragging?: (sizes: number[]) => void
  subPanelRatio?: number
}

function SplitView({
  children,
  subPanelRatio = 25,
  onDragStart = noop,
  onDragEnd = noop,
  onDragging = noop,
}: SplitViewProps) {
  const cachedSizes = useRef<number[]>([])
  const [wrapperRect, setWrapperRect] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [sizeRatios, setSizeRatios] = useState<number[]>([subPanelRatio, 100 - subPanelRatio])

  const wrapperRef = useResizeObserver((entry: ResizeObserverEntry) => {
    setWrapperRect(entry.contentRect ?? {})
  })

  const _onDragStart: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizes.current = sizeRatios
    setIsDragging(true)
    onDragStart(e)
  }, [onDragStart, sizeRatios])

  const _onDragEnd: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizes.current = sizeRatios
    setIsDragging(false)
    onDragEnd?.(e)
  }, [onDragEnd, sizeRatios])

  const _onDragging: MouseEventHandler<HTMLDivElement> = (e) => {
    const curPositionX = e.pageX
    const subRatio = (curPositionX / wrapperRect['width']) * 100

    const nextSizes = [subRatio, 100 - subRatio]

    if (curPositionX < MIN_SUB_VIEW_SIZE) {
      nextSizes[0] = (MIN_SUB_VIEW_SIZE / wrapperRect['width']) * 100
      nextSizes[1] = 100 - nextSizes[0]
    } else if (curPositionX > MAX_SUB_VIEW_SIZE) {
      nextSizes[0] = (MAX_SUB_VIEW_SIZE / wrapperRect['width']) * 100
      nextSizes[1] = 100 - nextSizes[0]
    } else {
      nextSizes[0] = subRatio
      nextSizes[1] = 100 - subRatio
    }

    setSizeRatios(nextSizes)
    onDragging?.(nextSizes)
  }

  /* for performance, use 'sizesForPerformance' instead of 'sizes' */
  // const sizesForPerformance = isDragging ? cachedSizes.current : sizes

  const renderStyledChild = useCallback((childNode: JSX.Element, childIndex: number) => (
    React.cloneElement(childNode, {
      style: { flexBasis: `${sizeRatios[childIndex]}%` }
    })
  ), [sizeRatios])

  if (wrapperRect['width'] <= MOBILE_SCREEN_MAX_WIDTH) {
    return children[1]
  }

  const resizerPos = (sizeRatios[0] * wrapperRect['width'] / 100) - RESIZER_WIDTH / 2

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
          transform: `translateX(${resizerPos}px)`,
        }}
      />
    </div>
  )
}

export default SplitView
