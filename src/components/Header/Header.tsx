/* External */
import { Link } from 'gatsby'

/* Internal */
import * as styles from './Header.scss'

function Header() {

	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.buttons}>
					<div className={styles.red} />
					<div className={styles.yellow} />
					<div className={styles.green} />
				</div>
				<Link
					to='/'
					className={styles.viveLog}
				>
					vive kang's log
				</Link>
				<div className={styles.dummy} /> {/* dummy for space-between */}
			</div>
		</header>
	)
}

export default Header
