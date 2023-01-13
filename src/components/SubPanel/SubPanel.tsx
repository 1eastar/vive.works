/* External */
import { useCallback } from 'react'
import { navigate } from 'gatsby'

/* Internal */
import { EMAIL, GITHUB_REPOSITORY_URL } from '@commons/constants/info.constant'
import { SUB_PANEL_TITLE } from '@commons/constants/subPanel.constant'
import TagCollection from './TagCollection'
import TOC from './TOC'
import * as styles from './SubPanel.scss'

import GithubIcon from '-!svg-react-loader!@statics/icons/github.svg'
import EmailIcon from '-!svg-react-loader!@statics/icons/email.svg'

interface SubPanelProps {
  location: Location
}

function SubPanel({ location }: SubPanelProps) {
  const pathname = location.pathname

  const onClickHeader = useCallback(() => {
    navigate('/')
  }, [])

  const onClickGithubIcon = useCallback(() => {
    window.open(GITHUB_REPOSITORY_URL, '_blank', 'noopener noreferrer')
  }, [])

  const onClickEmailIcon = useCallback(() => {
    window.location.href = `mailto:${EMAIL}`
  }, [])

  return (
    <div className={styles.TOCContainer}>
      <div className={styles.header}>
        <div
          className={styles.title}
          onClick={onClickHeader}
        >
          Vive works
        </div>
        <div className={styles.icon} onClick={onClickGithubIcon}>
          <GithubIcon />
        </div>
        <div className={styles.icon} onClick={onClickEmailIcon}>
          <EmailIcon />
        </div>
      </div>
      <div className={styles.TOCItemTitle}>
        { pathname === '/'
          ? SUB_PANEL_TITLE['Main']
          : SUB_PANEL_TITLE['Post']
        }
      </div>
      { pathname === '/'
        ? <TagCollection />
        : <TOC />
      }
    </div>
  )
}

export default SubPanel
