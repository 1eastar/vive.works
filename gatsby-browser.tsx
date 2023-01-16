/* Internal */
import Layout from '@components/Layout'
import '@styles/reset.css'

export function wrapPageElement({ element, props }) {
  return (
    <Layout {...props}>{ element }</Layout>
  )
}