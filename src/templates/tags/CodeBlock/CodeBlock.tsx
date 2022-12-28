/* External */
import classNames from 'classnames'
import Highlight, { defaultProps } from 'prism-react-renderer'

/* Internal */
import useIsDarkMode from '@hooks/useIsDarkMode.hook'
import DarkTheme from './theme/theme-dark'
import LightTheme from './theme/theme-light'
import * as styles from './CodeBlock.scss'

interface CodeBlockProps {
  children: React.ReactElement
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const className = children.props.className || ''
  
  const isDarkMode = useIsDarkMode()

  return (
    <Highlight
      {...defaultProps}
      code={children.props.children.trim()} 
      language={className.split('-')[1]}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames(styles.codeContainer, className)} style={style}>
          { tokens.map((line, index) => (
            <div {...getLineProps({ line, key: index, className: styles.codeLine })}>
              <span className={styles.number}>
                { index + 1 }
              </span>
              <span className={styles.code}>
                { line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                )) }
              </span>
            </div>
          )) }
        </pre>
      )}
    </Highlight>
  )
}
