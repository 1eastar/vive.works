/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Tag } from '@utils/tag.utils'

/* Internal */
import TagItem from './TagItem'

afterEach(cleanup)

describe('<TagItem/>', () => {
  beforeEach(() => {
    location.href = 'https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2'
  })
  
  test('Tag 데이터를 형식에 맞게 렌더링해야 한다.', () => {
    const { TagEl, AllEl } = renderTagItem()

    expect(TagEl()).toBeInTheDocument()
    expect(TagEl()).toHaveTextContent('# mockText (2)')
    expect(AllEl()).toBeInTheDocument()
    expect(AllEl()).toHaveTextContent('# All (1)')
  })

  test('Tag 클릭 시 tag query를 갖는 href로 이동한다.', () => {
    const { clickTag } = renderTagItem()

    expect(location.href).toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')
    clickTag()
    expect(location.href).toBe('https://vive.works?tag=%23mockText')
  })

  test('All 클릭 시 /로 이동한다.', () => {
    const { clickAll } = renderTagItem()

    expect(location.href).toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')
    clickAll()
    expect(location.href).toBe('https://vive.works/')
  })
})


/* Helper function */
function renderTagItem() {
  const mockTag1: Tag = {
    text: 'mockText',
    count: 2,
  }

  const mockTag2: Tag = {
    text: 'All',
    count: 1,
  }

  const TagResult = render(<TagItem {...mockTag1}/>)
  const AllResult = render(<TagItem {...mockTag2}/>)

  const TagEl = () => TagResult.getByTestId('tag-mockText')
  const AllEl = () => AllResult.getByTestId('tag-All')

  function clickTag() {
    fireEvent.click(TagEl())
  }
  
  function clickAll() {
    fireEvent.click(AllEl())
  }

  return {
    TagEl,
    AllEl,
    clickTag,
    clickAll,
  }
}
