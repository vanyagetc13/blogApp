import React, { useState } from 'react'
import { ConfigProvider } from 'antd'
import styles from './AppHeader.module.scss'
import AuthorizedHeadSide from './AuthorizedHeadSide/AuthorizedHeadSide'

const AppHeader = () => {
	const [authorized, setAuthorized] = useState<boolean>(true)
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#1890FF',
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
					<h1 className={styles.title}>RealWorld Blog</h1>
				</div>
				<AuthorizedHeadSide auth={authorized} />
			</header>
		</ConfigProvider>
	)
}

export default AppHeader
