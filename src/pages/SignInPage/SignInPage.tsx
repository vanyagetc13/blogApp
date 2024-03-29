import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { constants } from '../../utils'
import { RootState } from '../../store'
import { loginUser, clearError } from '../../store/authSlice'
import PageWrapper from '../PageWrapper'
import LabeledInput from '../../components/LabeledInput/LabeledInput'
import { useAppDispatch } from '../../hooks'
import styles from './SignInPage.module.scss'

export interface ILoginForm {
	email: string
	password: string
}

const SignInPage = () => {
	const nav = useNavigate()
	const { register, setValue, formState, handleSubmit } =
		useForm<ILoginForm>()
	const dispatch = useAppDispatch()
	const {
		currentUser: user,
		error,
		loading,
	} = useSelector((state: RootState) => state.auth)
	const onSubmit: SubmitHandler<ILoginForm> = (data) => {
		dispatch(loginUser(data))
	}
	useEffect(() => {
		register('email', {
			required: constants.required,
			pattern: {
				value: constants.emailRegex,
				message: 'You need to enter valid email',
			},
		})
		register('password', {
			required: constants.required,
			minLength: {
				value: 6,
				message: 'Password must be at least 6 symbols long',
			},
			maxLength: {
				value: 40,
				message: 'Password can not be longer then 40 symbols',
			},
		})
		dispatch(clearError())
	}, [])
	useEffect(() => {
		if (user && user.token) {
			localStorage.setItem('token', JSON.stringify(user.token))
			nav('/articles')
		}
	}, [user])
	return (
		<PageWrapper className={styles.page}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h3 className={styles.title}>Sign In</h3>
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
				<Button type="primary" htmlType="submit" loading={loading}>
					Login
				</Button>
				{error && <div className={styles.error}>{error}</div>}
			</form>
			<div className={styles.extra}>
				Don’t have an account? <Link to={'/sign-up'}>Sign Up</Link>.
			</div>
		</PageWrapper>
	)
}

export default SignInPage
