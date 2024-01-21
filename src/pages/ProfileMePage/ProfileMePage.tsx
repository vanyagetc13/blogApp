import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'

const ProfileMePage = () => {
	const nav = useNavigate()
	const { currentUser, loading } = useSelector(
		(state: RootState) => state.auth
	)
	console.log(currentUser?.username)
	useEffect(() => {
		if (currentUser?.username && !loading)
			nav(`/profiles/${currentUser.username}`)
		else nav('/sign-in')
	}, [loading])
	return null
}

export default ProfileMePage
