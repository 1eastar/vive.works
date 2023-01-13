/* External */
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

/* Internal */
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
import MainTransition from './Transitions/MainTransition'
import SubTransition from './Transitions/SubTransition'

interface LayoutProps {
	children: React.ReactNode
	location: Location
}

function Layout({ children, location }: LayoutProps) {

	return (
		<>
			<Header />
			<SplitView>
				<div className={styles.panelContainer}>
					<SubTransition location={location}>
						<SubPanel location={location} />
					</SubTransition>
				</div>
				<div className={styles.mainContainer}>
					<div className={styles.main}>
						<MainTransition location={location}>
							{ children }
						</MainTransition>
					</div>
					<div className={styles.footer}>
						© { new Date().getFullYear() } &middot; Vive kang {/* &middot; All rights reserved */}
					</div>
				</div>
			</SplitView>
		</>
	)
}

export default Layout
