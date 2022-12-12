import * as React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Seo from '../components/Seo/Seo'

const SecondPage = () => (
	<Layout>
		<h1>Hi from the second page</h1>
		<p>Welcome to page 2</p>
		<Link to='/'>Go back to the homepage</Link>
	</Layout>
)

export const Head = () => <Seo title='Page two' />

export default SecondPage
