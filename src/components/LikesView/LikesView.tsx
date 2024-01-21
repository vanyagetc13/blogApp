import React from 'react'
import { HeartFilled, HeartTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import { IArticle } from '../../types'
import styles from './LikewView.module.scss'

type Props = {
	likes: number
	favorited: boolean
}
type PropsBtn = {
	favorited: IArticle['favorited']
}
const ButtonBy = ({ favorited }: PropsBtn) => {
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
			<Button icon={icon} type="text" className={styles.btn} />
		</ConfigProvider>
	)
}

const LikesView = ({ likes, favorited }: Props) => {
	return (
		<div className={styles.wrapper}>
			<ButtonBy favorited={favorited} />
			<div className={styles.likes}>{likes}</div>
		</div>
	)
}

export default LikesView
