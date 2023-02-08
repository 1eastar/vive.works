/* External */
import { render, cleanup } from '@testing-library/react'

/* Internal */
import TagCollection from './TagCollection'

afterEach(cleanup)

describe('<TagCollection/>', () => {
  test('성공적으로 렌더링된다.', () => {
    const { TagCollectionEl } = renderTagCollection()

    expect(TagCollectionEl()).toBeInTheDocument()
  })
  
  test('[snapshot] 정확한 Tag 데이터 리스트를 렌더링한다.', () => {
    const { TagCollectionEl } = renderTagCollection()

    expect(TagCollectionEl()).toMatchSnapshot()
  })
})


/* Helper function */
function renderTagCollection() {
  const result = render(<TagCollection/>)

  const TagCollectionEl = () => result.getByTestId('tagCollection')

  return {
    result,
    TagCollectionEl,
  }
}
