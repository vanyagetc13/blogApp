import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../PageWrapper'
import { RootState } from '../../store'
import ArticleForm from '../../components/ArticleForm/ArticleForm'
import styles from './NewArticlePage.module.scss'

const NewArticlePage = () => {
	const user = useSelector((state: RootState) => state.auth.currentUser)
	const nav = useNavigate()
	useEffect(() => {
		if (!user) {
			setTimeout(() => nav('/'), 3000)
		}
	}, [])
	if (!user) return <div>You are not loged in.</div>
	return (
		<PageWrapper className={styles.page}>
			<ArticleForm formTitle="Create New Article" type="create" />
		</PageWrapper>
	)
}

export default NewArticlePage
