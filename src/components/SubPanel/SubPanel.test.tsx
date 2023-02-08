/* External */
import { render, cleanup, fireEvent } from '@testing-library/react'

/* Internal */
import SubPanel from './SubPanel'

beforeAll(() => {
  const mockIntersectionObserver = jest.fn().mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })

  window.IntersectionObserver = mockIntersectionObserver
})

afterEach(cleanup)

describe('<SubPanel/>', () => {
  describe('게시글 페이지', () => {
    test('[snapshot] 게시글 페이지에서는 헤더, 아이콘들과 함께 TOC를 렌더링한다.', () => {
      const { SubPanelEl } = renderSubPanel()
  
      expect(SubPanelEl()).toMatchSnapshot()
    })

    test('헤더 클릭 시 메인 화면으로 이동한다.', () => {
      const { clickHeader } = renderSubPanel()
  
      expect(location.href).toBe('https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2')
      clickHeader()
      expect(location.href).toBe('https://vive.works/')
    })
  })

  describe('메인 페이지', () => {
    test('[snapshot] 헤더, 아이콘들과 함께 Tag collection을 렌더링한다.', () => {
      const { SubPanelEl } = renderSubPanel()
  
      expect(SubPanelEl()).toMatchSnapshot()
    })

    test('헤더 클릭 시 메인 화면으로 이동한다.', () => {
      const { clickHeader } = renderSubPanel()
  
      expect(location.href).toBe('https://vive.works/')
      clickHeader()
      expect(location.href).toBe('https://vive.works/')
    })
  })
})


/* Helper function */
function renderSubPanel() {
  const location = { pathname: '/' } as Location
  const Result = render(<SubPanel location={location}/>)

  const SubPanelEl = () => Result.getByTestId('SubPanel-container')

  const Header_Main = () => Result.getByText('Vive works')

  function clickHeader() {
    fireEvent.click(Header_Main())
  }


  return {
    SubPanelEl,
    clickHeader,
  }
}
