/* External */
import { render, cleanup } from '@testing-library/react'

/* Internal */
import Header from './Header'

afterEach(cleanup)

describe('<Header/>', () => {
  test('신호등과 메인 text를 렌더링해야 한다.', () => {
    const { MainText } = renderHeader()

    expect(MainText()).toBeInTheDocument()
  })

  test('메인 text를 클릭 시 메인 화면으로 이동한다.', () => {
    const { MainText } = renderHeader()

    expect(MainText()).toHaveAttribute('href', '/')
  })
})


/* Helper function */
function renderHeader() {
  const result = render(<Header/>)

  const MainText = () => result.getByRole('link', { name: 'Vive kang’s works' })

  return {
    MainText,
  }
}
