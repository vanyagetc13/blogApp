import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper'
import ArticleForm from '../../components/ArticleForm/ArticleForm'
import { useAppDispatch } from '../../hooks'
import { getArticleBySlug } from '../../store/articleSlice'
import { RootState } from '../../store'
import styles from './ArticleEditPage.module.scss'

const ArticleEditPage = () => {
	const { slug } = useParams()
	const articleBySlug = useSelector(
		(state: RootState) => state.articles.articleBySlug
	)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (!articleBySlug.article && slug) dispatch(getArticleBySlug({ slug }))
	}, [])
	if (!articleBySlug.article && articleBySlug.loading)
		return <div>Loading...</div>
	if (!articleBySlug.article) return <div>No article found.</div>
	const { body, title, description, tagList } = articleBySlug.article
	return (
		<PageWrapper className={styles.page}>
			<ArticleForm
				formTitle="Edit Article"
				type="edit"
				values={{ body, title, description, tagList }}
				slug={slug}
			/>
		</PageWrapper>
	)
}

export default ArticleEditPage
