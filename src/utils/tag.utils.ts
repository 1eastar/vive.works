/* Internal */
import { TagQueryResult } from '@commons/types/QueryType'

export interface Tag {
  text: string
  count: number
}

export function changeAllMdxToTagCollection({ allMdx }: TagQueryResult): Tag[] {
  let total = 0
  const tagMap = new Map<string, number>()

  allMdx.nodes.forEach(node => {
    node.frontmatter.tags.forEach(tag => {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1)
      } else {
        tagMap.set(tag, 1)
      }
      total++
    })
  })

  const tagList: Tag[] = [ { text: 'All', count: total } ]
  tagMap.forEach((value, key) => {
    tagList.push({
      text: key,
      count: value,
    })
  })

  return tagList
}
