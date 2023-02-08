/* eslint-disable no-irregular-whitespace */
/* External */
import { render, cleanup } from '@testing-library/react'

/* Internal */
import TOCItem from './TOCItem'

afterEach(cleanup)

describe('<TOCItem/>', () => {
  test('[snapshot] 성공적으로 렌더링된다.', () => {
    const { TOCItemEl } = renderTOCItem()
    const snapshot = `
    <a
      class=""
      data-testid="TOCItem-mockTitle"
      href="#mockTitle"
    >
        
       
      mockTitle
    </a>
    `

    expect(TOCItemEl()).toMatchInlineSnapshot(snapshot)
  })

  test('클릭 시 해당하는 헤더의 href로 이동한다.', () => {
    const { TOCItemEl } = renderTOCItem()

    expect(TOCItemEl()).toHaveAttribute('href', '#mockTitle')
  })
})


/* Helper function */
function renderTOCItem() {
  const props = {
    item: {
      title: 'mockTitle',
      level: 1,
    },
    currentHeading: document.createElement('a'),
  }

  const result = render(<TOCItem {...props}/>)

  const TOCItemEl = () => result.getByTestId('TOCItem-mockTitle')

  return {
    TOCItemEl,
  }
}
