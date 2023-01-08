/* External */
import React from 'react'
import type { StateResultsProvided } from "react-instantsearch-core"
import { connectStateResults } from "react-instantsearch-dom"

/* Internal */
import * as styles from './Loader.scss'

interface LoaderProps extends StateResultsProvided {
  children: React.ReactNode
}

function Loader({ children, isSearchStalled }: LoaderProps) {
  return (
    <>
      { isSearchStalled ? (
        <div className={styles.wrapper}>
          <div className={styles.loader} />
        </div>
        ) : (
          children
        )
      }
    </>
  )
}

export default connectStateResults(Loader)
