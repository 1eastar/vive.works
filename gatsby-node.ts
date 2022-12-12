/* External */
import { CreatePagesArgs } from "gatsby"
import path from 'path'

/* Internal */
import { PageContext } from "src/templates/PostTemplate"

require('ts-node').register()

interface MarkDownMetadata {
	path: string
	title: string
	description: string
	author: string
	date: string
	image: string
}

interface QueryResult {
	allMarkdownRemark: {
		edges: {
			node: {
				html: string
				frontmatter: MarkDownMetadata
			}
		}[]
	}
}

exports.createPages = async ({ actions, graphql }: CreatePagesArgs) => {
	const postTemplatePath = path.resolve(`src/templates/PostTemplate.tsx`)
	const { createPage } = actions

	const { data, errors } = await graphql<QueryResult>(`
		{
			allMarkdownRemark {
				edges {
					node {
						html
						frontmatter {
							path
							title
							description
							author
							date
							image
						}
					}
				}
			}
		}
	`)

	if (errors) {
		throw errors
	}

	data!.allMarkdownRemark.edges.forEach(({node}) => {
		createPage<PageContext>({
			path: node.frontmatter.path,
			component: postTemplatePath,
			context: {
				html: node.html,
				title: node.frontmatter.title,
				description: node.frontmatter.description,
				author: node.frontmatter.author,
				date: node.frontmatter.date,
				image: node.frontmatter.image,
			},
		})
	})
}
