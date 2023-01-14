/* External */
import { InstantSearch } from 'react-instantsearch-dom'

/* Internal */
import SearchResult from './SearchResult'
import SearchBox from './SearchBox'
import { searchClient } from './Search.constant'

interface SearchProps {
  index: {
    name: string
  }
}

function Search({
  index,
}: SearchProps) {

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={index.name}
    >
      <SearchBox />
      <SearchResult />
    </InstantSearch>
  )
}

export default Search
