/* Internal */
import { TOCQueryNode, TOCQueryResult } from "@commons/types/QueryType"
import type { TOCItem } from "@components/SubPanel/TOC/TOCItem"
import { isBrowser } from "./browser.utils"

const slashRegex = /\//g

export function findCurrentMDX({ allMdx }: TOCQueryResult): TOCQueryNode {
  const pathname = isBrowser ? window.location.pathname : ''
  
  return allMdx.nodes.find(Mdx =>
    Mdx.frontmatter.slug.replace(slashRegex, '') === pathname.replace(slashRegex, '')
  )
}

export function changeMdxToTOCItems(Mdx: TOCQueryNode): TOCItem[] {
  const MDXBodyTitles = Mdx.body.split('\n').filter(t => t.includes('# ') && t[0] === '#')
  
  return MDXBodyTitles.map(title => {
    const level = title.match(/#/g).length - 1
    return {
      title: title.split('# ')[1].trim(),
      level,
    }
  })
}
