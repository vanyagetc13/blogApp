import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import PageWrapper from '../PageWrapper'
import styles from './ProfileEditPage.module.scss'

const ProfileEditPage = () => {
	const nav = useNavigate()
	const { username } = useParams()
	const { currentUser, loading } = useSelector(
		(state: RootState) => state.auth
	)
	const notTheSameUser =
		currentUser?.username && currentUser?.username !== username
	useEffect(() => {
		if (notTheSameUser) setTimeout(() => nav(`/profiles/${username}`), 3000)
		if (!currentUser && !loading) setTimeout(() => nav('/'), 3000)
	}, [])
	if (notTheSameUser && !loading) {
		return <div>You can not edit this profile, redirecting...</div>
	}
	if (loading && !currentUser) return <div>Loading...</div>
	if (!currentUser) return <div>No such user, redirecting...</div>
	return (
		<PageWrapper className={styles.page}>
			<ProfileForm user={currentUser} />
		</PageWrapper>
	)
}

export default ProfileEditPage
