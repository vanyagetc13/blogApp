import React from 'react'
import { IArticle } from '../../types'
import ArticleCard from '../ArticleCard/ArticleCard'
import styles from './ArticleList.module.scss'

type Props = {
	articles: IArticle[]
}

const ArticleList = ({ articles }: Props) => {
	return (
		<ul className={styles.list}>
			{articles.map((article) => (
				<ArticleCard key={article.slug} article={article} />
			))}
		</ul>
	)
}

export default ArticleList
