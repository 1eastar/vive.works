/* External */
import classnames from 'classnames'
import { MouseEventHandler, useCallback, useState } from 'react'

/* Internal */
import * as styles from './Resizer.scss'

interface ResizerProps {
  className?: string
  onDragStart: MouseEventHandler<HTMLDivElement>
  onDragEnd: MouseEventHandler<HTMLDivElement>
  onDragging: MouseEventHandler<HTMLDivElement>
  style?: any
}

function Resizer({
  className,
  onDragStart,
  onDragEnd,
  onDragging,
  style,
}: ResizerProps) {
  const [isDraging, setIsDragging] = useState(false)

  const handleMouseMove = useCallback((e) => {
    onDragging(e)
  }, [onDragging])

  const handleMouseUp = useCallback((e) => {
    setIsDragging(false)
    onDragEnd(e)
    
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [onDragEnd, handleMouseMove])

  const onMouseDown = useCallback((e) => {
    setIsDragging(true)
    onDragStart(e)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [onDragStart, handleMouseMove, handleMouseUp])

  return (
    <div
      style={style}
      className={classnames(styles.resizer, className, {
        [styles.dragging]: isDraging,
      })}
      onMouseDown={onMouseDown}
    />
  )
}

export default Resizer
