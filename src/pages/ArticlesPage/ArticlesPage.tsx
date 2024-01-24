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
	const loadUser = useSelector((state: RootState) => state.auth.loading)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const offset = (page - 1) * PAGE_SIZE
		const payload = { limit: PAGE_SIZE, offset, token }
		if (!loadUser) dispatch(getArticles(payload))
	}, [page, token, loadUser])

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
