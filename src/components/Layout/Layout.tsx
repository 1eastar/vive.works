/* External */
import { useMemo } from 'react'
import { motion } from 'framer-motion'

/* Internal */
import { isBrowser } from '@utils/browser.utils'
import Header from '@components/Header'
import SplitView from '@components/SplitView'
import SubPanel from '@components/SubPanel'
import {
	HOME_MAIN_PANEL_ANIMATION_VARIANTS,
	HOME_SUB_PANEL_ANIMATION_VARIANTS,
	POST_MAIN_PANEL_ANIMATION_VARIANTS,
	POST_SUB_PANEL_ANIMATION_VARIANTS,
	MAIN_PANEL_TRANSITION,
} from './Layout.constant'
import * as styles from './Layout.scss'

interface LayoutProps {
	children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const pathname = isBrowser ? window.location.pathname : ''
	
	const [subPanelVariants, mainPanelVariants] = useMemo(() => {
		if(pathname === '/') {
			return [
				HOME_SUB_PANEL_ANIMATION_VARIANTS,
				HOME_MAIN_PANEL_ANIMATION_VARIANTS,
			]
		} else {
			return [
				POST_SUB_PANEL_ANIMATION_VARIANTS,
				POST_MAIN_PANEL_ANIMATION_VARIANTS,
			]
		}
	}, [pathname])

	return (
		<>
			<Header />
			<SplitView>
				<div className={styles.panelContainer}>
					<motion.span
						layout
						variants={subPanelVariants}
						initial="initial"
						animate="mounting"
						exit="exit"
					>
						<SubPanel />
					</motion.span>
				</div>
				<div className={styles.mainContainer}>
					<motion.div
						layout
						className={styles.main}
						variants={mainPanelVariants}
						initial="initial"
						animate="mounting"
						exit="exit"
						transition={MAIN_PANEL_TRANSITION}
					>
						{ children }
					</motion.div>
					<div className={styles.footer}>
						© { new Date().getFullYear() } &middot; Vive kang {/* &middot; All rights reserved */}
					</div>
				</div>
			</SplitView>
		</>
	)
}

export default Layout
