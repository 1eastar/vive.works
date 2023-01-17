/* External */

/* Internal */
import { Frontmatter } from '@commons/types/QueryType'
import PostTag from '@components/PostTag'
import ClockIcon from '-!svg-react-loader!@statics/icons/clock.svg'
import * as styles from './PostHead.scss'

interface PostHeadProps extends Frontmatter {
  timeToRead: string
}

function PostHead({
  title,
  date,
  tags,
  timeToRead,
}: PostHeadProps) {
  return (
    <div className={styles.postHeadContainer}>
      <div className={styles.postTitle}>
        { title }
      </div>
      <div className={styles.postInfo}>
        { date } &middot;&nbsp; <ClockIcon /> { timeToRead }
      </div>
      <div className={styles.postTagsWrapper}>
        <div className={styles.postTags}>
          { tags.map(tag => <PostTag key={tag} value={tag} clickEnabled />) }
        </div>
        <div className={styles.divider}/>
      </div>
    </div>
  )
}

export default PostHead
