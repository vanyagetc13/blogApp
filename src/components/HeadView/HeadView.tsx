import React from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from '../../types'
import LikesView from '../LikesView/LikesView'
import TagsView from '../TagsView/TagsView'
import ProfileView from '../ProfileView/ProfileView'
import { getNormalDateString } from '../../utils'
import styles from './HeadView.module.scss'

type Props = Pick<
	IArticle,
	| 'title'
	| 'author'
	| 'createdAt'
	| 'favoritesCount'
	| 'favorited'
	| 'tagList'
	| 'slug'
>

const HeadView = ({
	title,
	slug,
	favorited,
	favoritesCount,
	tagList,
	author,
	createdAt,
}: Props) => {
	return (
		<div className={styles.header}>
			<div className={styles.articleInfo}>
				<div className={styles.title__wrapper}>
					<h3 className={styles.title}>
						<Link to={`/articles/${slug}`} className={styles.link}>
							{title.trim()}
						</Link>
					</h3>
					<LikesView likes={favoritesCount} favorited={favorited} />
				</div>
				{tagList.length ? (
					<TagsView tagList={tagList} />
				) : (
					<span className="empty">No tags here :(</span>
				)}
			</div>
			<ProfileView
				user={author}
				additional={getNormalDateString(createdAt)}
			/>
		</div>
	)
}

export default HeadView
