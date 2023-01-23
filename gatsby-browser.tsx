/* External */
import { WrapPageElementBrowserArgs } from 'gatsby'

/* Internal */
import Layout from '@components/Layout'

import '@statics/fonts/Chalkboard/Chalkboard.css'
import '@statics/fonts/Inter/inter.css'
import '@styles/reset.css'

export function wrapPageElement({ element, props }: WrapPageElementBrowserArgs) {
  return (
    <Layout {...props}>{ element }</Layout>
  )
}
