/* Internal */
import { TagQueryResult } from '@commons/types/QueryType'
import { changeAllMdxToTagCollection } from '@utils/tag.utils'
import { mockStaticQueryResult } from '../../../jest/__mocks__/gatsby.mock'

describe('tag utils 테스트', () => {
  describe('changeAllMdxToTagCollection() 함수 테스트', () => {
    test('tag 가 없을 때 All label만 반환한다.', () => {
      const mockMDXs: TagQueryResult = {
        allMdx: {
          nodes: [ { frontmatter: { tags: [] } } ],
        },
      }
      const mockResult = changeAllMdxToTagCollection(mockMDXs)
      expect(mockResult).toContainEqual({ text: 'All', count: 1 })
    })

    test('tag 가 있을 때 정확한 Tag list를 반환한다..', () => {
      const mockResult = changeAllMdxToTagCollection(mockStaticQueryResult)

      expect(mockResult).toHaveLength(6)
      expect(mockResult).toContainEqual({ text: 'All', count: 5 })
      expect(mockResult[2].count).toBe(3)
    })
  })
})