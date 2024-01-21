import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'antd/es/button'
import { ConfigProvider, Space } from 'antd'
import ProfileView from '../../ProfileView/ProfileView'
import { IUser } from '../../../types'
import { useAppDispatch } from '../../../hooks'
import { logOut } from '../../../store/authSlice'

interface Props {
	user: Partial<IUser> | null
}

const AuthorizedHeadSide = ({ user }: Props) => {
	const nav = useNavigate()
	const dispatch = useAppDispatch()
	if (!user)
		return (
			<Space>
				<Button type="text" onClick={() => nav('/sign-in')}>
					Sign In
				</Button>
				<Button onClick={() => nav('/sign-up')}>Sign Up</Button>
			</Space>
		)
	return (
		<Space>
			<Button onClick={() => nav('/new-article')}>Create Article</Button>
			<ProfileView user={user} />
			<ConfigProvider
				theme={{
					token: {
						colorPrimaryHover: 'red',
					},
					components: {
						Button: {
							defaultColor: '#000000BF',
							defaultBorderColor: '#000000BF',
						},
					},
				}}
			>
				<Button
					onClick={() => {
						dispatch(logOut())
						localStorage.removeItem('token')
						nav('/')
					}}
				>
					Log Out
				</Button>
			</ConfigProvider>
		</Space>
	)
}

export default AuthorizedHeadSide
