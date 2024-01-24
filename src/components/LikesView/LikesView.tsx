import React from 'react'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { HeartFilled, HeartTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import { IArticle } from '../../types'
import { RootState } from '../../store'
import { useAppDispatch } from '../../hooks'
import { deleteLike, postLike } from '../../store/likeSlice'
import { toggleLike } from '../../store/articleSlice'
import styles from './LikewView.module.scss'

type Props = {
	likes: number
	favorited: boolean
	slug: string
}
type PropsBtn = {
	favorited: IArticle['favorited']
	slug: Props['slug']
}
const ButtonBy = ({ favorited, slug }: PropsBtn) => {
	const token = useSelector(
		(state: RootState) => state.auth.currentUser?.token
	)
	const dispatch = useAppDispatch()
	const clickHandle = () => {
		if (!favorited && token) {
			dispatch(postLike({ slug, token }))
				.then(unwrapResult)
				.then((payload) => {
					if (payload.article) dispatch(toggleLike(slug))
				})
		}
		if (favorited && token) {
			dispatch(deleteLike({ slug, token }))
				.then(unwrapResult)
				.then((payload) => {
					if (payload.article) dispatch(toggleLike(slug))
				})
		}
	}
	const icon = favorited ? (
		<HeartFilled className={styles.heart} />
	) : (
		<HeartTwoTone twoToneColor="#FF0707" className={styles.heart} />
	)
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						textHoverBg: 'transparent',
					},
				},
			}}
		>
			<Button
				icon={icon}
				type="text"
				className={styles.btn}
				onClick={clickHandle}
			/>
		</ConfigProvider>
	)
}

const LikesView = ({ likes, favorited, slug }: Props) => {
	return (
		<div className={styles.wrapper}>
			<ButtonBy favorited={favorited} slug={slug} />
			<div className={styles.likes}>{likes}</div>
		</div>
	)
}

export default LikesView
