/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'

/* Internal */
import Resizer from './Resizer'

afterEach(cleanup)

describe('<Resizer/>', () => {
  test('성공적으로 렌더링된다.', () => {
    const { ResizerEl } = renderResizer()

    expect(ResizerEl()).toBeInTheDocument()
  })
  
  test('마우스를 눌렀다가 떼면 onDragStart와 onDragEnd가 호출되어야 한다.', () => {
    const { onDragStart, onDragging, onDragEnd, MouseDown, MouseUp } = renderResizer()

    expect(onDragStart).not.toHaveBeenCalled()
    expect(onDragging).not.toHaveBeenCalled()
    expect(onDragEnd).not.toHaveBeenCalled()

    MouseDown()
    MouseUp()

    expect(onDragStart).toHaveBeenCalledTimes(1)
    expect(onDragging).not.toHaveBeenCalled()
    expect(onDragEnd).toHaveBeenCalledTimes(1)
  })

  test('마우스를 누른 후 이동하고 떼면 onDragStart, onDragging, onDragEnd가 모두 호출되어야 한다.', () => {
    const { onDragStart, onDragging, onDragEnd, MouseDown, MouseMove, MouseUp } = renderResizer()

    expect(onDragStart).not.toHaveBeenCalled()
    expect(onDragging).not.toHaveBeenCalled()
    expect(onDragEnd).not.toHaveBeenCalled()

    MouseDown()
    MouseMove()
    MouseUp()
    
    expect(onDragStart).toHaveBeenCalledTimes(1)
    expect(onDragging).toHaveBeenCalled()
    expect(onDragEnd).toHaveBeenCalledTimes(1)
  })
})

/* Helper function */
function renderResizer() {
  const onDragStart = jest.fn()
  const onDragging = jest.fn()
  const onDragEnd = jest.fn()

  const result = render(<Resizer onDragStart={onDragStart} onDragging={onDragging} onDragEnd={onDragEnd} />)

  const ResizerEl = () => result.getByTestId('resizer')

  function MouseDown() {
    fireEvent.mouseDown(ResizerEl())
  }

  function MouseUp() {
    fireEvent.mouseUp(ResizerEl())
  }

  function MouseMove() {
    fireEvent.mouseMove(ResizerEl())
  }

  return {
    onDragStart,
    onDragging,
    onDragEnd,
    ResizerEl,
    MouseDown,
    MouseUp,
    MouseMove,
  }
}
