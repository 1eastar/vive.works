/* External */
import { render, cleanup } from '@testing-library/react'

/* Internal */
import TOC from './TOC'

beforeAll(() => {
  const mockIntersectionObserver = jest.fn().mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })

  window.IntersectionObserver = mockIntersectionObserver
  window.location.pathname = '/mockSlug3'
})

afterEach(cleanup)

describe('<TOC/>', () => {
  test('성공적으로 렌더링된다.', () => {
    const { TOCEl } = renderTOC()

    expect(TOCEl()).toBeInTheDocument()
  })

  test('[snapshot] title(h1, h2, h3)이 있을 때 TOC 리스트를 제대로 렌더링한다.', () => {
    const { TOCEl } = renderTOC()

    expect(TOCEl()).toMatchSnapshot()
  })
})


/* Helper function */
function renderTOC() {
  const result = render(<TOC/>)

  const TOCEl = () => result.getByTestId('TOC-container')

  return {
    result,
    TOCEl,
  }
}
