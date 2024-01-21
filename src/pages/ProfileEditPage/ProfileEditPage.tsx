import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import PageWrapper from '../PageWrapper'
import styles from './ProfileEditPage.module.scss'

const ProfileEditPage = () => {
	const nav = useNavigate()
	const { username } = useParams()
	const { currentUser } = useSelector((state: RootState) => state.auth)
	const notTheSameUser =
		currentUser?.username && currentUser?.username !== username
	useEffect(() => {
		if (notTheSameUser) setTimeout(() => nav(`/profiles/${username}`), 3000)
	}, [])
	if (notTheSameUser) {
		return <div>You can not edit this profile, redirecting...</div>
	}
	return (
		<PageWrapper className={styles.page}>
			<h2>{username}</h2>
		</PageWrapper>
	)
}

export default ProfileEditPage
