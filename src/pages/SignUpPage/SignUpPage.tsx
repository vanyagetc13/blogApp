import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, notification } from 'antd'
import { useAppDispatch } from '../../hooks'
import PageWrapper from '../PageWrapper'
import ErrorSpan from '../../components/ErrorSpan/ErrorSpan'
import LabeledInput from '../../components/LabeledInput/LabeledInput'
import { registerUser } from '../../store/authSlice'
import { IRegisterForm } from '../../types'
import { RootState } from '../../store'
import styles from './SignUpPage.module.scss'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const defaultValues: IRegisterForm = {
	email: '',
	username: '',
	password: '',
	passwordRepeated: '',
	agreement: false,
}

const required = {
	value: true,
	message: 'This field is required',
}

const SignUpPage = () => {
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const [api, context] = notification.useNotification()
	const {
		currentUser: user,
		error,
		loading,
	} = useSelector((state: RootState) => state.auth)
	const { register, handleSubmit, setValue, setError, formState } =
		useForm<IRegisterForm>({ defaultValues })
	const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
		if (data.password !== data.passwordRepeated)
			return setError('passwordRepeated', {
				// eslint-disable-next-line quotes
				message: 'Passwords do not match',
			})
		const user = {
			email: data.email,
			password: data.password,
			username: data.username,
		}
		dispatch(registerUser({ user }))
	}
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
			required,
			minLength: {
				value: 6,
				message: 'Password must be at least 6 symbols long',
			},
			maxLength: {
				value: 40,
				message: 'Password can not be longer then 40 symbols',
			},
		})
		register('passwordRepeated', { required })
		register('agreement', { required })
	}, [])
	useEffect(() => {
		if (user && user.token) {
			localStorage.setItem('token', JSON.stringify(user.token))
			nav('/articles')
		}
	}, [user])
	useEffect(() => {
		if (error)
			api.error({
				message: error,
				placement: 'bottomRight',
				duration: 7,
			})
	}, [error])
	return (
		<PageWrapper className={styles.page}>
			{context}
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h3 className={styles.title}>Create new account</h3>
				<LabeledInput
					title="Username"
					name="username"
					error={formState.errors.username}
					onChange={(e) => setValue('username', e.target.value)}
				/>
				<LabeledInput
					title="Email Address"
					name="email"
					error={formState.errors.email}
					onChange={(e) => setValue('email', e.target.value)}
				/>
				<LabeledInput
					title="Password"
					pass
					name="password"
					error={formState.errors.password}
					onChange={(e) => setValue('password', e.target.value)}
				/>
				<LabeledInput
					title="Repeat Password"
					name="passwordRepeated"
					error={formState.errors.passwordRepeated}
					onChange={(e) =>
						setValue('passwordRepeated', e.target.value)
					}
					pass
				/>
				<hr />
				<div className={styles.agreement}>
					<Checkbox
						name="agreement"
						onChange={(e) =>
							setValue('agreement', e.target.checked)
						}
					>
						I agree to the processing of my personal information
					</Checkbox>
					{formState.errors.agreement && (
						<ErrorSpan message="Check required!" />
					)}
				</div>
				<Button type="primary" htmlType="submit" loading={loading}>
					Create
				</Button>
			</form>
			<div className={styles.extra}>
				Already have an account? <Link to={'/sign-in'}>Sign In</Link>.
			</div>
		</PageWrapper>
	)
}

export default SignUpPage
