/* Internal */
import Layout from '@components/Layout/Layout'

export function wrapPageElement({ element, props }) {
  return (
    <Layout {...props}>{ element }</Layout>
  )
}