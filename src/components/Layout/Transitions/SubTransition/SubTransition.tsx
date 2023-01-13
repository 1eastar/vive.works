/* External */
import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* Internal */
import * as styles from './SubTransition.scss'

interface SubTransitionProps {
  location: Location
  children: React.ReactNode
}

function SubTransition({
  location: { pathname },
  children,
}: SubTransitionProps) {

  const transitionClassNames = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    enterDone: styles.enterDone,
    exit: styles.exit,
    exitActive: styles.exitActive,
    exitDone: styles.exitDone,
  }
  
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

export default SubTransition
