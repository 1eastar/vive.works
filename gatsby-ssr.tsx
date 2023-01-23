/* External */
import { WrapPageElementNodeArgs } from 'gatsby'

/* Internal */
import Layout from '@components/Layout'

export function wrapPageElement({ element, props }: WrapPageElementNodeArgs) {
  return (
    <Layout {...props}>{ element }</Layout>
  )
}
