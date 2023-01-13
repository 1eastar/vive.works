/* External */
import React, { useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* Internal */
import * as styles from './MainTransition.scss'

interface MainTransitionProps {
  location: Location
  children: React.ReactNode
}

function MainTransition({
  location: { pathname },
  children,
}: MainTransitionProps) {
  const transitionClassNames = useMemo(() => {
    if (pathname === '/') {
      return {
        enter: styles.indexEnter,
        enterActive: styles.indexEnterActive,
        enterDone: styles.indexEnterDone,
        exit: styles.indexExit,
        exitActive: styles.indexExitActive,
        exitDone: styles.indexExitDone,
      }
    }
    
    return {
      enter: styles.postEnter,
      enterActive: styles.postEnterActive,
      enterDone: styles.postEnterDone,
      exit: styles.postExit,
      exitActive: styles.postExitActive,
      exitDone: styles.postExitDone,
    }
  }, [pathname])
  
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={pathname}
        timeout={1000}
        classNames={transitionClassNames}
      >
        <div className={styles.transitionWrapper}>
          { children }
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default MainTransition
