/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'

/* Internal */
import PostTag from './PostTag'

afterEach(cleanup)

describe('<PostTag/>', () => {
  beforeEach(() => {
    location.href = 'https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2'
  })

  test('#가 붙은 tag를 렌더링해야 한다.', () => {
    const { clickEnabledTag, clickDisabledTag } = renderPostTag()

    expect(clickEnabledTag()).toBeInTheDocument()
    expect(clickDisabledTag()).toBeInTheDocument()
  })

  test('clickEnabled가 true일 때, tag를 클릭 시 tag 검색 결과 페이지로 이동한다.', () => {
    const { clickTag } = renderPostTag()

    expect(location.href)
      .toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')

    clickTag(true)

    expect(location.href).toBe('https://vive.works/?tag=%23mockTagValue1')
  })

  test('clickEnabled가 false일 때, tag를 클릭 시 아무 일도 일어나지 않는다.', () => {
    const { clickTag } = renderPostTag()

    expect(location.href)
      .toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')

    clickTag(false)

    expect(location.href)
      .toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')
  })
})

/* Helper function */
function renderPostTag() {
  const mockValue1 = 'mockTagValue1'
  const mockValue2 = 'mockTagValue2'
  const clickEnabledResult = render(<PostTag value={mockValue1} clickEnabled/>)
  const clickDisabledResult = render(<PostTag value={mockValue2}/>)

  const clickEnabledTag = () => clickEnabledResult.getByText('# mockTagValue1')
  const clickDisabledTag = () => clickDisabledResult.getByText('# mockTagValue2')

  function clickTag(clickEnabled: boolean) {
    if (clickEnabled) fireEvent.click(clickEnabledTag())
    else fireEvent.click(clickDisabledTag())
  }

  return {
    clickEnabledTag,
    clickDisabledTag,
    clickTag,
  }
}
