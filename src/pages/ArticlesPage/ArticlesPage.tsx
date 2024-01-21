import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../store/articleSlice'
import { AppDispatch, RootState } from '../../store'
import ArticleList from '../../components/ArticleList/ArticleList'
import PageWrapper from '../PageWrapper'
import styles from './ArticlesPage.module.scss'

const PAGE_SIZE = 10

const ArticlesPage = () => {
	const [page, setPage] = useState<number>(1)
	const { articles, articlesCount, loading } = useSelector(
		(state: RootState) => state.articles
	)
	const token = useSelector(
		(state: RootState) => state.auth.currentUser?.token
	)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getArticles({ token }))
	}, [])
	useEffect(() => {
		dispatch(getArticles({ token }))
	}, [token])

	useEffect(() => {
		const offset = (page - 1) * PAGE_SIZE
		const payload = { limit: PAGE_SIZE, offset, token }
		dispatch(getArticles(payload))
	}, [page, token])

	return (
		<PageWrapper className={styles.page}>
			{!loading && <ArticleList articles={articles} />}
			{loading && <div>Loading...</div>}
			<Pagination
				current={page}
				total={articlesCount}
				pageSize={10}
				showSizeChanger={false}
				onChange={(next) => setPage(next)}
				style={{ alignSelf: 'center' }}
				disabled={loading}
			/>
		</PageWrapper>
	)
}

export default ArticlesPage
