import React from 'react'
import ReactMarkdown from 'react-markdown'
import HeadView from '../HeadView/HeadView'
import { IArticle } from '../../types'
import getSlicedText from './../../utils/getSlicedText'
import styles from './ArticleCard.module.scss'

type Props = {
	article: IArticle
}

const ArticleCard = ({ article }: Props) => {
	const {
		title,
		slug,
		favorited,
		favoritesCount,
		tagList,
		author,
		createdAt,
		body,
	} = article
	return (
		<li className={styles.card}>
			<HeadView
				title={title}
				slug={slug}
				favorited={favorited}
				favoritesCount={favoritesCount}
				tagList={tagList}
				author={author}
				createdAt={createdAt}
			/>
			{body ? (
				<ReactMarkdown className={styles.body}>
					{getSlicedText(body.replaceAll('/n', '\n'), 50)}
				</ReactMarkdown>
			) : (
				<span className="empty">Nothing here :(</span>
			)}
		</li>
	)
}

export default ArticleCard
