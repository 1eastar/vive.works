/* External */
import algoliasearch from "algoliasearch/lite"
import { useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"

/* Internal */
import SearchResult from "./SearchResult"
import SearchBox from "./SearchBox"

interface SearchProps {
  index: {
    name: string
  }
}

function Search({
  index,
}: SearchProps) {

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={index.name}
      stalledSearchDelay={200}
    >
      <SearchBox />
      <SearchResult />
    </InstantSearch>
  )
}

export default Search
