import React, { useMemo } from 'react'
import { IArticle } from '../../types'
import styles from './TagsView.module.scss'

type Props = {
	tagList: IArticle['tagList']
	maxLength?: number | null
}

const TagsView = ({ tagList, maxLength = 3 }: Props) => {
	if (!tagList.length) return null
	const tags = useMemo(
		() => Array.from(new Set(tagList)).filter((tag) => tag.trim() !== ''),
		[tagList]
	)
	return (
		<ul className={styles.list}>
			{tags
				.slice(0, maxLength === null ? tags.length : maxLength)
				.map((tag, idx) => (
					<li key={idx} className={styles.tag}>
						{tag}
					</li>
				))}
		</ul>
	)
}

export default TagsView
