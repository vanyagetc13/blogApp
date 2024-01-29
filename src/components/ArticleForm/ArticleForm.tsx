import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, message } from 'antd'
import LabeledInput from '../LabeledInput/LabeledInput'
import TagsForm from '../TagsForm/TagsForm'
import { useAppDispatch } from '../../hooks'
import { constants } from '../../utils'
import { RootState } from '../../store'
import { createArticle, editArticle } from '../../store/articleSlice'
import { tag } from '../../types'
import styles from './ArticleForm.module.scss'

export type IArticleForm = {
	tagList: string[]
	title: string
	description: string
	body: string
}

type Props = {
	values?: IArticleForm
	formTitle: string
	type: 'edit' | 'create'
	slug?: string
}

const ArticleForm = ({ values, formTitle, type, slug }: Props) => {
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const [api, context] = message.useMessage()
	const loading = useSelector((state: RootState) => state.articles.loading)
	const error = useSelector((state: RootState) => state.articles.error)
	const token = useSelector(
		(state: RootState) => state.auth.currentUser?.token
	)
	const { register, handleSubmit, formState, setValue } =
		useForm<IArticleForm>({
			defaultValues: values,
		})
	useEffect(() => {
		register('title', {
			required: constants.required,
		})
		register('description', {
			required: constants.required,
		})
		register('body', {
			required: constants.required,
		})
		register('tagList')
	}, [])

	useEffect(() => {
		if (!error && !loading && formState.isSubmitSuccessful && slug)
			nav(`/articles/${slug}`)
		if (!error && !loading && formState.isSubmitSuccessful && !slug) {
			nav('/')
		}
		if (error)
			api.error({
				content: error,
				duration: 7,
			})
	}, [loading, error, formState.isSubmitSuccessful])

	const onSubmit: SubmitHandler<IArticleForm> = (data) => {
		data.tagList = data.tagList.filter((tag) => tag.trim() !== '')
		if (type === 'create') dispatch(createArticle({ article: data, token }))
		if (type === 'edit' && slug && token)
			dispatch(editArticle({ article: data, slug, token }))
	}
	const [title, setTitle] = useState<string>(values?.title || '')
	const [description, setDescription] = useState<string>(
		values?.description || ''
	)
	const [body, setBody] = useState<string>(values?.body || '')
	const [tags, setTags] = useState<tag[]>(
		values?.tagList
			? values.tagList.map((tag) => ({
					value: tag,
					id: nanoid(),
				}))
			: [{ value: '', id: '0' }]
	)

	useEffect(() => {
		setValue(
			'tagList',
			tags.map((tag) => tag.value)
		)
	}, [tags])

	const addNewTag = () => {
		setTags((prev) => {
			const newTags = [...prev]
			newTags.push({
				value: '',
				id: nanoid(),
			})
			return newTags
		})
	}
	const deleteTag = (id: string) => {
		setTags((prev) => {
			const idx = prev.findIndex((tag) => tag.id === id)
			const newTags = [...prev]
			newTags.splice(idx, 1)
			return newTags
		})
	}
	const tagChange = (id: string, value: string) => {
		setTags((prev) => {
			const idx = prev.findIndex((tag) => tag.id === id)
			const newTags = [...prev]
			newTags[idx].value = value
			return newTags
		})
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{context}
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
			<TagsForm
				tagList={tags}
				tagChange={tagChange}
				addNewTag={addNewTag}
				deleteTag={deleteTag}
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
