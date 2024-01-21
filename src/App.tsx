import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './components/AppHeader/AppHeader'
import { useAppDispatch } from './hooks'
import { getCurrentUser } from './store/authSlice'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') ?? 'null') as
			| string
			| null
		if (token) dispatch(getCurrentUser({ token }))
	}, [])
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	)
}

export default App
