/* External */
import { useStaticQuery, graphql } from 'gatsby'

/* Internal */
import Header from '@components/Header'
import * as styles from './Layout.scss'
// 스타일 import 관련 warning이 계속 뜸;;;

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
				className={styles.container}
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
