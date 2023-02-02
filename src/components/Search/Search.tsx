/* External */
import { InstantSearch } from 'react-instantsearch-dom'

/* Internal */
import { searchClient } from '@commons/constants/Search.constant'
import SearchResult from './SearchResult'
import SearchBox from './SearchBox'

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
