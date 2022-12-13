/* External */
import { CreatePagesArgs } from "gatsby"
import path from 'path'

/* Internal */

require('ts-node').register()

export type PageContext = {
	// path: string
}

interface MDXMetadata {
	path: string
	id: string
	title: string
	description: string
	author: string
	date: string
	image: string
}

interface QueryResult {
	allMdx: {
		nodes: {
			frontmatter: Pick<MDXMetadata, "path" | "id">
			internal: {
				contentFilePath: string
			}
		}[]
	}
}

exports.createPages = async ({ actions, graphql, reporter }: CreatePagesArgs) => {
	const postTemplatePath = path.resolve(`./src/templates/PostTemplate.tsx`)
	const { createPage } = actions

	const { data, errors } = await graphql<QueryResult>(`
		{
			allMdx(sort: { frontmatter: { date: DESC } }, limit: 100) {
				nodes {
					frontmatter {
						path
						id
					}
          internal {
            contentFilePath
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
			path: node.frontmatter.path,
			component: `${postTemplatePath}?__contentFilePath=${node.internal.contentFilePath}`,
			// component: postTemplatePath,
			context: {id: node.frontmatter.id},
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
