/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const path = require('path')

require("dotenv").config()
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
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/statics/images`,
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
				icon: `src/statics/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				gatsbyRemarkPlugins: [
					{
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              disableBgImage: true,
              quality: 100,
              withWebp: true,
              loading: 'lazy',
            },
          },
				],
			},
		},
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassRuleTest: /.^/,
        sassRuleModulesTest: /\.s(a|c)ss$/,
        useResolveUrlLoader: true,
      },
    },
		`gatsby-plugin-react-helmet`,
		`babel-preset-gatsby`,
		{
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    },
		{
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia.utils.ts")
      },
    },
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /icons/ 
				}
			}
		},
	],
}
