import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { useAppDispatch } from '../../hooks'
import LabeledInput from '../LabeledInput/LabeledInput'
import { IUser } from '../../types'
import { updateUser } from '../../store/authSlice'
import { RootState } from '../../store'
import styles from './ProfileForm.module.scss'

const required = {
	value: true,
	message: 'This field is required',
}
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const urlRegex =
	// eslint-disable-next-line no-useless-escape
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

function isEmpty(obj: unknown) {
	return JSON.stringify(obj) === '{}'
}

export type IProfileForm = {
	username: string
	email: string
	password: string
	avatar: IUser['image']
	bio: string
}

type Props = {
	user: IUser
}

const ProfileForm = ({ user }: Props) => {
	const dispatch = useAppDispatch()
	const loading = useSelector((state: RootState) => state.auth.loading)
	const token = useSelector(
		(state: RootState) => state.auth.currentUser?.token
	)
	const defaultValues: IProfileForm = {
		username: user.username || '',
		email: user.email || '',
		password: '',
		avatar: user.image || '',
		bio: user.bio || '',
	}
	const { register, formState, handleSubmit, setValue } =
		useForm<IProfileForm>({
			defaultValues,
		})
	useEffect(() => {
		register('username', {
			required,
			minLength: {
				value: 3,
				message: 'Username must be at least 3 symbols long',
			},
			maxLength: {
				value: 20,
				message: 'Username can not be longer then 20 symbols',
			},
		})
		register('email', {
			required,
			pattern: {
				value: emailRegex,
				message: 'You need to enter valid email',
			},
		})
		register('password', {
			minLength: {
				value: 6,
				message: 'Password must be at least 6 symbols long',
			},
			maxLength: {
				value: 40,
				message: 'Password can not be longer then 40 symbols',
			},
		})
		register('avatar', {
			pattern: {
				value: urlRegex,
				message: 'You need to pass valid url.',
			},
		})
		register('bio')
	}, [])
	const [username, setUsername] = useState<string>(user.username || '')
	const [avatar, setAvatar] = useState<string>(user.image || '')
	const [email, setEmail] = useState<string>(user.email || '')
	const [password, setPassword] = useState<string>(user.password || '')
	const [bio, setBio] = useState<string>(user.bio || '')
	const onSubmit: SubmitHandler<IProfileForm> = (data) => {
		const newUser: {
			[key: string]: string | undefined | IUser['image']
		} = {
			username:
				data.username === user.username || data.username === ''
					? undefined
					: data.username,
			image:
				data.avatar === user.image || data.avatar === ''
					? undefined
					: data.avatar,
			password:
				data.password === user.password || data.password === ''
					? undefined
					: data.password,
			bio:
				data.bio === user.bio || data.bio === '' ? undefined : data.bio,
			email: data.email === user.email ? undefined : data.email,
		}
		Object.keys(newUser).forEach((key) =>
			newUser[key] === undefined ? delete newUser[key] : {}
		)
		if (token && !isEmpty(newUser))
			dispatch(updateUser({ user: newUser, token }))
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<h2 className={styles.title}>Edit Profile</h2>
			<LabeledInput
				title="Username"
				onChange={(e) => {
					const value = e.target.value
					setUsername(value)
					setValue('username', value)
				}}
				error={formState.errors.username}
				value={username}
			/>
			<LabeledInput
				title="Email address"
				name="email"
				onChange={(e) => {
					const value = e.target.value
					setEmail(value)
					setValue('email', value)
				}}
				error={formState.errors.email}
				value={email}
			/>
			<LabeledInput
				title="New password"
				name="password"
				pass
				onChange={(e) => {
					const value = e.target.value
					setPassword(value)
					setValue('password', value)
				}}
				error={formState.errors.password}
				value={password}
			/>
			<LabeledInput
				title="Avatar image (url)"
				name="avatar"
				onChange={(e) => {
					const value = e.target.value
					setAvatar(value)
					setValue('avatar', value)
				}}
				error={formState.errors.avatar}
				value={avatar}
			/>
			<LabeledInput
				area
				title="Bio"
				onChange={(e) => {
					const value = e.target.value
					setBio(value)
					setValue('bio', value)
				}}
				error={formState.errors.bio}
				value={bio}
			/>
			<Button type="primary" htmlType="submit" loading={loading}>
				Save
			</Button>
		</form>
	)
}

export default ProfileForm
