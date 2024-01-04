import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './components/AppHeader/AppHeader'

function App() {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	)
}

export default App
