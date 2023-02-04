/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'

/* Internal */
import PostHead from './PostHead'

afterEach(cleanup)

describe('<PostHead/>', () => {
  test('post 정보들(title, date, tags, time to read)을 렌더링해야 한다.', () => {
    const { Title, Info, Tags, Tag1 } = renderPostHead()

    expect(Title()).toBeInTheDocument()
    expect(Info()).toBeInTheDocument()
    expect(Tag1()).toBeInTheDocument()
    expect(Tags()).toHaveLength(3)
  })

  test('tag를 클릭하면 메인 페이지로 이동하여 tag를 검색한 결과를 보여준다.', () => {
    const { clickTag1 } = renderPostHead()

    expect(location.href)
      .toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')

    clickTag1()

    expect(location.href).toBe('https://vive.works/?tag=%23tag1')
  })
})

/* Helper function */
export default function renderPostHead() {
  const mockProps = {
    title: 'This is mock title',
    date: '2023-01-16',
    tags: ['tag1', 'tag2', 'tag3'],
    timeToRead: '21 min read',
    slug: '',
    id: '',
    description: '',
    author: '',
    image: '',
  }

  const result = render(<PostHead {...mockProps}/>)

  const Title = () => result.getByText('This is mock title')

  const Info = () => result.getByText('2023-01-16 · 21 min read')

  const Tag1 = () => result.getByText('# tag1')

  const Tags = () => mockProps.tags.map(tag => result.queryByText('# ' + tag))

  function clickTag1() {
    fireEvent.click(Tag1())
  }

  return {
    result,
    Title,
    Info,
    Tags,
    Tag1,
    clickTag1,
  }
}
