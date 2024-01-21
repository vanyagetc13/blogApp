import { imgURL } from '.'

type DateString = string

interface IArticle {
	slug: string
	title: string
	description: string
	body: string
	tagList: string[]
	createdAt: DateString
	updatedAt: Date
	favorited: boolean
	favoritesCount: number
	author: {
		username: string
		bio: string
		image: imgURL
		following: boolean
	}
}

export default IArticle
