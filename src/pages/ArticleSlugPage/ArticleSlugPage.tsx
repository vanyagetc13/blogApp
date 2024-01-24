import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, ConfigProvider, Popconfirm } from 'antd'
import ReactMarkdown from 'react-markdown'
import HeadView from '../../components/HeadView/HeadView'
import { deleteArticle, getArticleBySlug } from '../../store/articleSlice'
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
	const loadUser = useSelector((state: RootState) => state.auth.loading)
	const error = useSelector((state: RootState) => state.articles.error)
	useEffect(() => {
		if (slug && !loadUser)
			dispatch(getArticleBySlug({ slug, token: auth?.token }))
	}, [slug, loadUser])
	const deleteHandler = () => {
		if (slug && auth?.token)
			dispatch(deleteArticle({ slug, token: auth?.token }))
				.then(unwrapResult)
				.then((ok) => {
					if (ok) nav('/')
				})
	}
	useEffect(() => {
		if (error)
			setTimeout(() => {
				nav('/')
			}, 3000)
	}, [error])
	return (
		<PageWrapper className={styles.page}>
			{!loading && !article && (
				<div>
					Error occured... {error} <br /> You will be redirected.
				</div>
			)}
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
								<Popconfirm
									title="Delete the article"
									description="Are you sure to delete the article?"
									okText="Yes"
									cancelText="No"
									okButtonProps={{ loading: loading }}
									onConfirm={deleteHandler}
								>
									<Button danger>Delete</Button>
								</Popconfirm>
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
