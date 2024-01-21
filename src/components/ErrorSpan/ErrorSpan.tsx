import React from 'react'
import styles from './ErrorSpan.module.scss'

type Props = {
	message: string
}

const ErrorSpan = ({ message }: Props) => {
	return <span className={styles.error}>{message}</span>
}

export default ErrorSpan
