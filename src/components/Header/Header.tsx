/* External */
import { useCallback } from 'react'
import classNames from 'classnames'
import { Link, navigate } from 'gatsby'

/* Internal */
import { isBrowser } from '@utils/browser.utils'
import * as styles from './Header.scss'

import HomeIcon from '-!svg-react-loader!@statics/icons/home.svg'
import CloseIcon from '-!svg-react-loader!@statics/icons/close.svg'

function Header() {
	const onClickRedButton = useCallback(() => {
		if (isBrowser) {
			window.close()
		}
	}, [])

	const onClickGreenButton = useCallback(() => {
		navigate('/')
	}, [])

	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.buttons}>
					<div
						className={classNames(styles.red, styles.svgIconWrapper)}
						onClick={onClickRedButton}
					>
						<CloseIcon className={styles.svgIcon} />
					</div>
					<div className={classNames(styles.yellow, styles.svgIconWrapper)} />
					<div
						className={classNames(styles.green, styles.svgIconWrapper)}
						onClick={onClickGreenButton}
					>
						<HomeIcon className={styles.svgIcon} />
					</div>
				</div>
				<Link
					to='/'
					className={styles.viveWorks}
				>
					vive kang&rsquo;s works
				</Link>
				<div className={styles.dummy} /> {/* dummy for space-between */}
			</div>
		</header>
	)
}

export default Header
