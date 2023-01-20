/* External */

/* Internal */
import Search from '@components/Search'
import Seo from '@components/Seo'
import { searchIndex } from '@components/Search/Search.constant'

const IndexPage = () => {
  return (
    <>
      <Search index={searchIndex}/>
    </>
  )
}

export const Head = () => <Seo />

export default IndexPage
