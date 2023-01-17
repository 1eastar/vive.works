/* Internal */
import { TagQueryResult } from '@commons/types/QueryType'

export interface Tag {
  text: string
  count: number
}

export function changeAllMdxToTagCollection({ allMdx }: TagQueryResult): Tag[] {
  const tagMap = new Map<string, number>()

  allMdx.nodes.forEach(node => {
    node.frontmatter.tags.forEach(tag => {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1)
      } else {
        tagMap.set(tag, 1)
      }
    })
  })

  const tagList: Tag[] = [ { text: 'All', count: allMdx.nodes.length } ]
  tagMap.forEach((value, key) => {
    tagList.push({
      text: key,
      count: value,
    })
  })

  return tagList
}
