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
} from '@commons/constants/SplitView.constant'
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
  subPanelRatio = 20,
  onDragStart = noop,
  onDragEnd = noop,
  onDragging = noop,
}: SplitViewProps) {
  const cachedSizeRatios = useRef<number[]>([])
  const [wrapperRect, setWrapperRect] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [sizeRatios, setSizeRatios] = useState<number[]>([subPanelRatio, 100 - subPanelRatio])

  const wrapperRef = useResizeObserver((entry: ResizeObserverEntry) => {
    setWrapperRect(entry.contentRect ?? {})
  })

  const _onDragStart: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizeRatios.current = sizeRatios
    setIsDragging(true)
    onDragStart(e)
  }, [onDragStart, sizeRatios])

  const _onDragEnd: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    cachedSizeRatios.current = sizeRatios
    setIsDragging(false)
    onDragEnd?.(e)
  }, [onDragEnd, sizeRatios])

  const _onDragging: MouseEventHandler<HTMLDivElement> = (e) => {
    const curPositionX = e.pageX
    const subRatio = (curPositionX / wrapperRect['width']) * 100

    const nextSizeRatios = [subRatio, 100 - subRatio]

    if (curPositionX < MIN_SUB_VIEW_SIZE) {
      nextSizeRatios[0] = (MIN_SUB_VIEW_SIZE / wrapperRect['width']) * 100
      nextSizeRatios[1] = 100 - nextSizeRatios[0]
    } else if (curPositionX > MAX_SUB_VIEW_SIZE) {
      nextSizeRatios[0] = (MAX_SUB_VIEW_SIZE / wrapperRect['width']) * 100
      nextSizeRatios[1] = 100 - nextSizeRatios[0]
    } else {
      nextSizeRatios[0] = subRatio
      nextSizeRatios[1] = 100 - subRatio
    }

    setSizeRatios(nextSizeRatios)
    onDragging?.(nextSizeRatios)
  }

  /* for performance, use 'enhancedSizeRatios' instead of 'sizeRatios' */
  // const enhancedSizeRatios = isDragging ? cachedSizeRatios.current : sizeRatios

  const renderStyledChild = useCallback((childNode: JSX.Element, childIndex: number) => (
    React.cloneElement(childNode, {
      key: childIndex,
      style: { flexBasis: `${sizeRatios[childIndex]}%` }
    })
  ), [sizeRatios])
  
  const resizerPos = (sizeRatios[0] * wrapperRect['width'] / 100) - RESIZER_WIDTH / 2

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
