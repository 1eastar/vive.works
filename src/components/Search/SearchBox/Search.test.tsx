/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'

/* Internal */
import SearchBox from './SearchBox'

afterEach(cleanup)

describe('<SearchBox/>', () => {
  test.skip('검색 필드 및 clear 버튼을 렌더링한다.', () => {
    const { SearchInput, ClearButton } = renderSearchBox()

    expect(SearchInput()).toBeInTheDocument()
    expect(ClearButton()).toBeInTheDocument()
  })

  test.skip('tag가 query parameter로 있을 경우 그 value 값을 입력한다.', () => {
    const { SearchInput } = renderSearchBox()

    expect(SearchInput()).toHaveValue('mockTag')
  })

  test.skip('clear 아이콘 클릭 시 입력 값을 지운다.', () => {
    const { 
      SearchInput,
      changeSearchInput,
      clickClearButton
    } = renderSearchBox()

    expect(SearchInput()).toHaveValue('mockTag')
    clickClearButton()
    expect(SearchInput()).toHaveValue('')
    changeSearchInput('search something')
    expect(SearchInput()).toHaveValue('search something')
    clickClearButton()
    expect(SearchInput()).toHaveValue('')
  })
})


/* Helper function */
function renderSearchBox() {
  const result = render(<SearchBox/>)

  const SearchInput = () => result.getByPlaceholderText('Search')

  const ClearButton = () => result.getByTestId('clear')

  function changeSearchInput(value: string) {
    fireEvent.change(SearchInput(), { target: { value } })
  }

  function clickClearButton() {
    fireEvent.click(ClearButton())
  }

  return {
    SearchInput,
    ClearButton,
    changeSearchInput,
    clickClearButton,
  }
}
