import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { IArticle, IUser } from '../../types'
import styles from './ProfileView.module.scss'

type Props = {
	user: IArticle['author'] | Partial<IUser>
	additional?: string
}
const smiles = [
	'https://static.productionready.io/images/smiley-cyrus.jpg',
	'https://api.realworld.io/images/smiley-cyrus.jpeg',
]
const ProfileView = ({ additional, user }: Props) => {
	return (
		<Link to={'/profiles/' + user.username} className={styles.wrapper}>
			<div className={styles.info}>
				<div className={styles.user}>{user.username}</div>
				{additional && (
					<div className={styles.additional}>{additional}</div>
				)}
			</div>
			<Avatar
				src={
					user.image && !smiles.includes(user.image)
						? user.image
						: undefined
				}
				size="large"
				icon={<UserOutlined />}
			/>
		</Link>
	)
}

export default ProfileView
