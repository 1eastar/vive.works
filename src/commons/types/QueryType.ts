export interface PageContext {
  slug: string
}

export interface Frontmatter {
	slug: string
	id: string
	title: string
	description: string
	author: string
	date: string
	image: string
  tags: string[]
}

// NOTE: gatsby 내장 interface인 CreateNodeArgs에서 사용하려면 Record<string, unknown>를
//       만족해야 하기 때문에 interface가 아닌 type으로 정의
//       (interface에 index signature '[key: string]: unknown'를 추가해줘도 됨)
export type MDX = {
  body: any
  frontmatter: Frontmatter
  htmlAst: any
  fields: {
    timeToRead: {
      text: string
    }
  }
  internal: {
		contentFilePath: string
	}
}

export interface TOCQueryNode {
  body: string
  frontmatter: Pick<Frontmatter, "slug">
}

export interface TagQueryNode {
  frontmatter: Pick<Frontmatter, "tags">
}

/* Query Results */
export interface AllMDXQueryResult {
  allMdx: {
    nodes: MDX[]
  }
}

export interface PostTemplateQueryResult {
  data: {
    mdx: MDX
  }
}

export interface TOCQueryResult {
  allMdx: {
    nodes: TOCQueryNode[]
  }
}

export interface TagQueryResult {
  allMdx: {
    nodes: TagQueryNode[]
  }
}
