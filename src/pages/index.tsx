/* External */

/* Internal */
import Search from "@components/Search/Search"
import Layout from "@components/Layout/Layout"
import Seo from "@components/Seo/Seo"
import { searchIndex } from "@components/Search/Search.constant"

const IndexPage = () => {

  return (
    <Layout>
      {/* <div className={styles.textCenter}> */}
        <Search
          index={searchIndex}
        />
      {/* </div> */}
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
