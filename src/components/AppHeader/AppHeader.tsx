import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { RootState } from '../../store'
import AuthorizedHeadSide from './AuthorizedHeadSide/AuthorizedHeadSide'
import styles from './AppHeader.module.scss'

const AppHeader = () => {
	const auth = useSelector((state: RootState) => state.auth)
	return (
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
			<header className={styles.header}>
				<div className={styles.title__wrapper}>
					<h1 className={styles.title}>
						<Link to={'/'}>RealWorld Blog</Link>
					</h1>
				</div>
				<AuthorizedHeadSide user={auth.currentUser} />
			</header>
		</ConfigProvider>
	)
}

export default AppHeader
