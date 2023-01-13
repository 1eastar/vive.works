/* External */
import { CreateNodeArgs, GatsbyNode } from 'gatsby'
import path from 'path'
import readingTime from 'reading-time'

/* Internal */
import { AllMDXQueryResult, MDX, PageContext } from '@commons/types/QueryType'

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
	const postTemplatePath = path.resolve('./src/templates/PostTemplate.tsx')
	const { createPage } = actions

	const { data, errors } = await graphql<AllMDXQueryResult>(`
		{
			allMdx(
				sort: { frontmatter: { date: DESC } },
				limit: 1000
			) {
				nodes {
					frontmatter {
						slug
					}
					internal {
						contentFilePath
					}
				}
			}
		}
	`)

	if (errors || !data) {
		reporter.panicOnBuild('Error loading MDX result', errors)
	}

	data!.allMdx.nodes.forEach((node) => {
		createPage<PageContext>({
			path: node.frontmatter.slug,
			component: `${postTemplatePath.trim()}?__contentFilePath=${node.internal.contentFilePath}`,
			context: { slug: node.frontmatter.slug },
		})
	})
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
	node, actions
}: CreateNodeArgs<MDX>) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body)
    })
  }
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			alias: {
				'@commons': path.resolve(__dirname, './src/commons'),
				'@components': path.resolve(__dirname, './src/components'),
				'@hooks': path.resolve(__dirname, './src/hooks'),
				'@pages': path.resolve(__dirname, './src/pages'),
				'@posts': path.resolve(__dirname, './src/posts'),
				'@statics': path.resolve(__dirname, './src/statics'),
				'@styles': path.resolve(__dirname, './src/styles'),
				'@templates': path.resolve(__dirname, './src/templates'),
				'@utils': path.resolve(__dirname, './src/utils'),
			},
    },
		module: {
			rules: [
				{
					test: /\.svg$/,
					exclude: /node_modules/,
					loader: 'svg-react-loader',
				}
			],
		},
  })
}
