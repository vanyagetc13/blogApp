import React from 'react'

interface Props {
	children: React.ReactNode
	className?: string
	[x: string]: unknown
}

const PageWrapper = ({ children, className = '', ...rest }: Props) => {
	const rootClasses = className + ' page'
	return (
		<section className={rootClasses} {...rest}>
			{children}
		</section>
	)
}

export default PageWrapper
