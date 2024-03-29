/* Internal */
import { TOCQueryNode, TOCQueryResult } from '@commons/types/QueryType'
import type { TOCItem } from '@components/SubPanel/TOC/TOCItem'

const slashRegex = /\//g

/**
 * 
 * @param data all MDX data
 * @param pathname current pathname
 * @returns MDX for current page
 */
export function findCurrentMDX({ allMdx }: TOCQueryResult, pathname: string): TOCQueryNode | undefined {
  return allMdx.nodes.find(Mdx =>
    Mdx.frontmatter.slug.replace(slashRegex, '') === pathname.replace(slashRegex, '')
  )
}

/**
 * 
 * @param Mdx MDX
 * @returns Mdx body title(h1, h2, h3) list
 */
export function getMdxBodyTitles(Mdx: TOCQueryNode) {
  return Mdx.body.split('\n').filter(t => t.includes('# ') && t[0] === '#')
}

/**
 * 
 * @param Mdx MDX
 * @returns list of TOC items
 */
export function getTOCfromMDX(Mdx: TOCQueryNode): TOCItem[] {
  return getMdxBodyTitles(Mdx).map<TOCItem>(title => {
    const level = title.match(/#/g).length - 1
    return {
      title: title.split('# ')[1].trim(),
      level,
    }
  })
}
