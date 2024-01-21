import React from 'react'
import { FieldError } from 'react-hook-form'
import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import ErrorSpan from '../ErrorSpan/ErrorSpan'
import styles from './LabeledInput.module.scss'

type Props = {
	pass?: boolean
	area?: boolean
	title: string
	placeholder?: string
	horizontal?: boolean
	error?: FieldError
	name?: string
	// eslint-disable-next-line no-unused-vars
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	[x: string]: unknown
}

const LabeledInput = ({
	title,
	placeholder = title,
	pass = false,
	area = false,
	horizontal = false,
	error,
	name = title.toLowerCase(),
	onChange,
	...rest
}: Props) => {
	const status = error && error.message ? 'error' : undefined
	rest = { ...rest, onChange, status, name, placeholder }
	return (
		<>
			<label
				className={
					horizontal
						? styles.label + ' ' + styles.horizontal
						: styles.label
				}
			>
				{title}
				{pass ? (
					<Input.Password {...rest} />
				) : area ? (
					<TextArea autoSize={{ minRows: 3 }} {...rest} />
				) : (
					<Input {...rest} />
				)}
				{error && error.message && (
					<ErrorSpan message={error.message} />
				)}
			</label>
		</>
	)
}

export default LabeledInput
