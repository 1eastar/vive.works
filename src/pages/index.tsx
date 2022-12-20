/* External */
import { StaticImage } from "gatsby-plugin-image"

/* Internal */
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"

const IndexPage = () => (
  <Layout>
    {/* <div className={styles.textCenter}> */}
      <StaticImage
        src="../statics/images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
    {/* </div> */}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
