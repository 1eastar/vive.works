/* External */
import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import path from 'path'
import readingTime from 'reading-time'

/* Internal */

require('ts-node').register()

export type PageContext = {
	slug: string
}

interface MDXMetadata {
	slug: string
	id: string
	title: string
	description: string
	author: string
	date: string
	image: string
}

type MDXNode = {
	body: string
	frontmatter: Pick<MDXMetadata, "slug">
}

interface QueryResult {
	allMdx: {
		nodes: MDXNode[]
	}
}
const dummy = {
	allMdx: {
		nodes: [
			{
				body: 'body',
				frontmatter: {
					slug: '/20221213'
				},
			}
		]
	}
}

exports.onCreateNode = ({ node, actions }: CreateNodeArgs<MDXNode>) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }: CreatePagesArgs) => {
	const postTemplatePath = path.resolve(`./src/templates/PostTemplate.tsx`)
	const { createPage } = actions

	const { data = dummy, errors } = await graphql<QueryResult>(`
		{
			allMdx(
				sort: { frontmatter: { date: DESC } },
				limit: 100
			) {
				nodes {
					frontmatter {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild('Error loading MDX result', errors)
	}

	data!.allMdx.nodes.forEach((node) => {
		createPage<PageContext>({
			path: node.frontmatter.slug,
			// PostTemplate.tsx에서 pageQuery로 path인 /slug에 해당하는 mdx를 불러올 거기 때문에 contentFilePath로 매칭해줄 필요없음
			// component: `${postTemplatePath}?__contentFilePath=${node.internal.contentFilePath}`,
			component: postTemplatePath,
			context: {slug: node.frontmatter.slug},
		})
	})
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
			alias: {
				"@commons": path.resolve(__dirname, "./src/commons"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@hooks": path.resolve(__dirname, "./src/hooks"),
				"@pages": path.resolve(__dirname, "./src/pages"),
				"@posts": path.resolve(__dirname, "./src/posts"),
				"@statics": path.resolve(__dirname, "./src/statics"),
				"@styles": path.resolve(__dirname, "./src/styles"),
				"@templates": path.resolve(__dirname, "./src/templates"),
			},
    },
  })
}
