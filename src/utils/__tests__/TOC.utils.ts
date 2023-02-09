/* Internal */
import { findCurrentMDX, getMdxBodyTitles, getTOCfromMDX } from '@utils/TOC.utils'
import { mockStaticQueryResult } from '../../../jest/__mocks__/gatsby.mock'

describe('TOC utils 테스트', () => {
  describe('findCurrentMDX() 함수 테스트', () => {
    test('모든 Mdx 데이터와 그 중 하나에 해당하는 pathname가 들어올 경우 해당되는 하나의 Mdx를 반환한다', () => {
      const mockPathname = '/mockSlug1'
      const result = {
        body: 'no titles',
        frontmatter: { slug: '/mockSlug1', tags: ['tag1', 'tag2'] },
      }
      expect(findCurrentMDX(mockStaticQueryResult, mockPathname)).toEqual(result)
    })

    test('모든 Mdx 데이터 중에 대응되는 pathname이 없을 경우 undefined를 반환한다.', () => {
      const mockPathname = '/notMatch'
      expect(findCurrentMDX(mockStaticQueryResult, mockPathname)).toBeUndefined()
    })

    // test('Mdx 데이터들 중 중복되는 slug가 있을 경우 .', () => {
    //   const mockPathname = '/notMatch'
    //   expect(findCurrentMDX(mockStaticQueryResult, mockPathname)).toBeUndefined()
    // })
  })

  describe('getMdxBodyTitles() 함수 테스트', () => {
    test('Mdx body에 title(h1, h2, h3)이 없을 경우 빈 리스트를 반환한다.', () => {
      const mockMdx = mockStaticQueryResult.allMdx.nodes[0]

      expect(getMdxBodyTitles(mockMdx)).toEqual([])
    })

    test('Mdx body에 title이 있을 경우 string 형식의 title list를 반환한다.', () => {
      const mockMdx1 = mockStaticQueryResult.allMdx.nodes[1]
      const mockMdx2 = mockStaticQueryResult.allMdx.nodes[2]

      const mockResult1 = ['# first title']
      const mockResult2 = ['# first title', '## second title', '### third title', '## fourth title', '# fifth title']

      expect(getMdxBodyTitles(mockMdx1)).toEqual(mockResult1)
      expect(getMdxBodyTitles(mockMdx2)).toEqual(mockResult2)
    })

    test('Mdx body에 동일한 title이 여러 개가 있더라도 값을 정확히 반환한다.', () => {
      const mockMdx = mockStaticQueryResult.allMdx.nodes[3]
      const mockResult = ['# first title', '# first title', '# first title', '# first title']

      expect(getMdxBodyTitles(mockMdx)).toEqual(mockResult)
    })
  })

  describe('getTOCfromMDX() 함수 테스트', () => {
    test('Mdx body에 title(h1, h2, h3)이 없을 경우 빈 리스트를 반환한다.', () => {
      const mockMdx = mockStaticQueryResult.allMdx.nodes[0]

      expect(getMdxBodyTitles(mockMdx)).toEqual([])
    })

    test('Mdx body에 title이 있을 경우 정확한 TOCItem[] 값을 반환한다.', () => {
      const mockMdx1 = mockStaticQueryResult.allMdx.nodes[1]
      const mockMdx2 = mockStaticQueryResult.allMdx.nodes[2]

      expect(getTOCfromMDX(mockMdx1)).toHaveLength(1)
      expect(getTOCfromMDX(mockMdx1)[0]).toHaveProperty('title', 'first title')
      expect(getTOCfromMDX(mockMdx1)[0]).toHaveProperty('level', 0)
      expect(getTOCfromMDX(mockMdx2)).toHaveLength(5)
      expect(getTOCfromMDX(mockMdx2)[2]).toHaveProperty('title', 'third title')
      expect(getTOCfromMDX(mockMdx2)[2]).toHaveProperty('level', 2)
    })
  })
})