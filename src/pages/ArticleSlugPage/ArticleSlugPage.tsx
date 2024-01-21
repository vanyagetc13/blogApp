import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, ConfigProvider } from 'antd'
import ReactMarkdown from 'react-markdown'
import HeadView from '../../components/HeadView/HeadView'
import { getArticleBySlug } from '../../store/articleSlice'
import { AppDispatch, RootState } from '../../store'
import PageWrapper from '../PageWrapper'
import styles from './ArticleSlugPage.module.scss'

const ArticleSlugPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const nav = useNavigate()
	const { slug } = useParams()
	const { article, loading } = useSelector(
		(state: RootState) => state.articles.articleBySlug
	)
	const auth = useSelector((state: RootState) => state.auth.currentUser)
	useEffect(() => {
		if (slug) dispatch(getArticleBySlug({ slug }))
	}, [slug])
	return (
		<PageWrapper className={styles.page}>
			{!loading && !article && <div>Error...</div>}
			{loading && <div>Loading...</div>}
			{article && (
				<>
					<HeadView {...article} />
					<div className={styles.header}>
						<p className={styles.description}>
							{article.description}
						</p>
						{auth && auth.username === article.author.username && (
							<div className={styles.btnBox}>
								<Button danger>Delete</Button>
								<ConfigProvider
									theme={{
										token: {
											colorPrimaryHover: 'green',
										},
										components: {
											Button: {
												defaultBorderColor: '#52C41A',
												defaultColor: '#52C41A',
											},
										},
									}}
								>
									<Button
										onClick={() =>
											nav(`/articles/${slug}/edit`)
										}
									>
										Edit
									</Button>
								</ConfigProvider>
							</div>
						)}
					</div>
					<ReactMarkdown className={styles.body}>
						{article.body ? article.body.replaceAll('/n', '') : ''}
					</ReactMarkdown>
				</>
			)}
		</PageWrapper>
	)
}

export default ArticleSlugPage
