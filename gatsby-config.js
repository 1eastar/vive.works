/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: `Vive's log`,
		description: `강동진의 log`,
		author: `Vive Kang`,
		siteUrl: `https://vive.log`,
		image: ``,
	},
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/public/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				// This will impact how browsers show your PWA/website
				// https://css-tricks.com/meta-theme-color-and-trickery/
				// theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`
		// {
		// 	resolve: `gatsby-plugin-graphql-codegen`,
		// 	options: {
		// 		fileName: `./src/graphql-type.ts`,
		// 		documentPaths: [
		// 			'./src/**/*.{ts,tsx}',
		// 			'./node_modules/gatsby-*/**/*.js',
		// 			'./gatsby-node.ts',
		// 		],
		// 	},
		// }
	],
}
