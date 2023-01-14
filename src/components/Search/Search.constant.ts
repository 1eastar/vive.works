/* External */
import algoliasearch from 'algoliasearch/lite'

export const searchIndex = { name: 'Posts' }

export const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)
