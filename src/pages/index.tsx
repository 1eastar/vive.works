/* External */

/* Internal */
import Search from "@components/Search"
import Layout from "@components/Layout"
import Seo from "@components/Seo"
import { searchIndex } from "@components/Search/Search.constant"

const IndexPage = () => {
  return (
    <Layout>
      <Search index={searchIndex}/>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
