/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Button, ConfigProvider, Divider, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../hooks'
import apiService from '../../services/apiService'
import IProfile from '../../types/profile'
import { logOut } from '../../store/authSlice'
import PageWrapper from '../PageWrapper'
import { RootState } from '../../store'
import styles from './ProfilePage.module.scss'

const smiles = [
	'https://static.productionready.io/images/smiley-cyrus.jpg',
	'https://api.realworld.io/images/smiley-cyrus.jpeg',
]

const ProfilePage = () => {
	const nav = useNavigate()
	const dispatch = useAppDispatch()
	const { username } = useParams()
	const { currentUser, loading } = useSelector(
		(state: RootState) => state.auth
	)
	const [profile, setProfile] = useState<IProfile>()
	const getProfile = async (username: string) => {
		const profile = await apiService.getProfile(username)
		setProfile(profile)
	}
	useEffect(() => {
		if (username) getProfile(username)
	}, [username])

	if (loading) return <div>Loading...</div>
	return (
		<PageWrapper className={styles.page}>
			<div className={styles.info}>
				<Avatar
					src={
						!profile?.image || !smiles.includes(profile.image)
							? profile?.image
							: undefined
					}
					alt="profile avatar"
					shape="square"
					size={210}
					icon={<UserOutlined />}
				/>
				<h3>{username}</h3>
			</div>
			<div className={styles.side}>
				{username === currentUser?.username &&
					currentUser?.username && (
						<>
							<Space>
								<ConfigProvider
									theme={{
										components: {
											Button: {
												colorPrimary: 'orange',
												colorPrimaryHover: '#e49606',
											},
										},
									}}
								>
									<Button
										type="primary"
										onClick={() =>
											nav(`/profiles/${username}/edit`)
										}
									>
										Edit Profile
									</Button>
								</ConfigProvider>
								<ConfigProvider
									theme={{
										components: {
											Button: {
												colorPrimary: '#F5222D',
												colorPrimaryHover: '#e6131d',
											},
										},
									}}
								>
									<Button
										onClick={() => {
											localStorage.removeItem('token')
											dispatch(logOut())
											nav('/articles')
										}}
										type="primary"
									>
										Log Out
									</Button>
								</ConfigProvider>
							</Space>
							<Divider style={{ margin: 0 }} />
						</>
					)}
				<div className={styles.bio}>
					{profile?.bio
						? profile.bio
						: 'User does not have biography filled.'}
				</div>
			</div>
		</PageWrapper>
	)
}

export default ProfilePage
