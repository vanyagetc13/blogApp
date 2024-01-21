import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form'
import { Button } from 'antd'
import LabeledInput from '../LabeledInput/LabeledInput'
import { useAppDispatch } from '../../hooks'
import { RootState } from '../../store'
import { createArticle, editArticle } from '../../store/articleSlice'
import styles from './ArticleForm.module.scss'

export type IArticleForm = {
	tags?: string[]
	title?: string
	description?: string
	body?: string
}

type Props = {
	values?: IArticleForm
	formTitle: string
	type: 'edit' | 'create'
	slug?: string
}

const required: ValidationRule<boolean> = {
	value: true,
	message: 'This field is required.',
}

const ArticleForm = ({ values, formTitle, type, slug }: Props) => {
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const loading = useSelector((state: RootState) => state.articles.loading)
	const error = useSelector((state: RootState) => state.articles.error)
	const token = useSelector(
		(state: RootState) => state.auth.currentUser?.token
	)
	const { register, handleSubmit, formState, setValue } =
		useForm<IArticleForm>({
			defaultValues: values,
			values,
		})
	useEffect(() => {
		register('title', {
			required,
		})
		register('description', {
			required,
		})
		register('body', {
			required,
		})
		register('tags')
	}, [])
	const [asked, setAsked] = useState<boolean>(false)
	useEffect(() => {
		if (!error && !loading && asked) nav('/')
	}, [loading, error, asked])
	const onSubmit: SubmitHandler<IArticleForm> = (data) => {
		if (type === 'create') dispatch(createArticle({ article: data, token }))
		console.log('here', slug)
		if (type === 'edit' && slug && token)
			dispatch(editArticle({ article: data, slug, token }))
		setAsked(true)
	}
	const [title, setTitle] = useState<string>(values?.title || '')
	const [description, setDescription] = useState<string>(
		values?.description || ''
	)
	const [body, setBody] = useState<string>(values?.body || '')
	const [tags, setTags] = useState<string[]>(values?.tags || [])
	// Доделать теги TODO
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.title}>{formTitle}</h2>
			<LabeledInput
				title="Title"
				value={title}
				error={formState.errors.title}
				onChange={(e) => {
					const value = e.target.value
					setTitle(value)
					setValue('title', value)
				}}
			/>
			<LabeledInput
				title="Short description"
				name="description"
				value={description}
				error={formState.errors.description}
				onChange={(e) => {
					const value = e.target.value
					setDescription(value)
					setValue('description', value)
				}}
			/>
			<LabeledInput
				title="Body"
				error={formState.errors.body}
				value={body}
				area
				onChange={(e) => {
					const value = e.target.value
					setBody(value)
					setValue('body', value)
				}}
			/>
			<Button
				type="primary"
				className={styles.submit}
				htmlType="submit"
				loading={loading}
			>
				Send
			</Button>
			{error && <span>{error}</span>}
		</form>
	)
}

export default ArticleForm
