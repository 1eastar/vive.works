// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: 'Vive works',
		description: '개발자 강동진의 기록들',
		author: 'Vive Kang',
		siteUrl: 'https://vive.works',
		image: 'https://vive.works/og_image.jpeg',
	},
	plugins: [
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/statics/images`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: `${__dirname}/src/posts`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Vive Kang',
				short_name: 'Vive',
				start_url: '/',
				display: 'minimal-ui',
				icon: 'src/statics/images/profile.jpeg',
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				gatsbyRemarkPlugins: [
					{
            resolve: 'gatsby-remark-images',
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
      resolve: 'gatsby-plugin-sass',
      options: {
        sassRuleTest: /.^/,
        sassRuleModulesTest: /\.s(a|c)ss$/,
      },
    },
		'gatsby-plugin-react-helmet',
		'babel-preset-gatsby',
		{
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    },
		{
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/utils/algolia.utils.ts'),
      },
    },
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /icons/,
				},
			},
		},
		'gatsby-plugin-sitemap',
		{
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js',
      },
    },
	],
}
