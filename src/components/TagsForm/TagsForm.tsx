import React from 'react'
import { Button, ConfigProvider, Input, Space } from 'antd'
import { tag } from '../../types'
import styles from './TagsForm.module.scss'

type Props = {
	tagList: tag[]
	tagChange: (id: string, value: string) => void
	addNewTag: () => void
	deleteTag: (id: string) => void
}

const TagsForm = ({ tagList, tagChange, addNewTag, deleteTag }: Props) => {
	return (
		<div className={styles.wrapper}>
			{tagList.map((tag, idx) => (
				<div key={tag.id} className={styles.inputWrapper}>
					<Input
						value={tag.value}
						placeholder="Tag"
						onChange={(e) => tagChange(tag.id, e.target.value)}
						className={styles.input}
					/>
					<Space className={styles.space}>
						{tagList.length > 1 && (
							<Button danger onClick={() => deleteTag(tag.id)}>
								Delete
							</Button>
						)}
						{idx === tagList.length - 1 && (
							<ConfigProvider
								theme={{
									token: {
										colorPrimary: '#1890FF',
										colorPrimaryHover: '#0763b9',
									},
									components: {
										Button: {
											defaultColor: '#1890FF',
											defaultBorderColor: '#1890FF',
										},
									},
								}}
							>
								<Button onClick={addNewTag}>Add</Button>
							</ConfigProvider>
						)}
					</Space>
				</div>
			))}
		</div>
	)
}

export default TagsForm
