/* Internal */
import { getValueFromQueryString, isBrowser } from '@utils/browser.utils'

describe('browser utils 테스트', () => {
  describe('isBrowser() 함수 테스트', () => {
    test('window 설정해을 해두었으므로 true를 반환한다.', () => {
      expect(isBrowser).toBe(true)
    })
  })

  describe('getValueFromQueryString() 함수 테스트', () => {
    test('빈 query string이 들어올 경우 undefined를 반환한다.', () => {
      expect(getValueFromQueryString('', 'key')).toBeUndefined()
    })

    test('정확한 형식의 query string과 key가 들어올 경우 그 value 반환한다.', () => {
      const mockQuery = '?key1=value1'
      const mockKey = 'key1'
      expect(getValueFromQueryString(mockQuery, mockKey)).toBe('value1')
      expect(typeof getValueFromQueryString(mockQuery, mockKey)).toBe('string')
    })

    test('정확한 형식의 query string이 들어오고 대응되는 key가 없을 경우 null을 반환한다.', () => {
      const mockQuery = '?key2=value2'
      const mockKey = 'key1'
      expect(getValueFromQueryString(mockQuery, mockKey)).toBe('null')
    })

    test('잘못된 형식의 query string이 들어오면 undefined를 반환한다.', () => {
      const mockQuery1 = '?wrongString1'
      const mockQuery2 = 'wrongString2'
      const mockQuery3 = '?wrongString1234567890~!@#$%^&*()_+|/'
      const mockKey = 'key1'
      expect(getValueFromQueryString(mockQuery1, mockKey)).toBeUndefined()
      expect(getValueFromQueryString(mockQuery2, mockKey)).toBeUndefined()
      expect(getValueFromQueryString(mockQuery3, mockKey)).toBeUndefined()
      expect(getValueFromQueryString(mockQuery2, mockQuery2)).toBeUndefined()
    })
  })
})