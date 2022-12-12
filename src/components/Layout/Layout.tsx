/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

/* External */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/* Internal */
import Header from '@components/Header'
import styles from './Layout.scss'

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<>
			<Header siteTitle={data.site.siteMetadata?.title || `Title`} />
			<div
				style={{
					margin: `0 auto`,
					maxWidth: `var(--size-content)`,
					padding: `var(--size-gutter)`,
				}}
			>
				<main>{children}</main>
				<footer
					style={{
						marginTop: `var(--space-5)`,
						fontSize: `var(--font-sm)`,
					}}
				>
					© {new Date().getFullYear()} &middot; Built with
					{` `}
					<a href='https://www.gatsbyjs.com'>Gatsby</a>
				</footer>
			</div>
		</>
	)
}

export default Layout

// postTemplate 랑 page들에 입힐 layout