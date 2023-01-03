/* External */
import type { WrapPageElementBrowserArgs } from "gatsby"
import { AnimatePresence } from "framer-motion"

/* Internal */
import "@styles/reset.css"

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => (
  <AnimatePresence exitBeforeEnter>{ element }</AnimatePresence>
)
