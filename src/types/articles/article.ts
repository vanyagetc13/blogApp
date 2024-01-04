import { imgURL } from '..'

interface IArticle {
	slug: string
	title: string
	description: string
	body: string
	tags: string[]
	createdAt: Date
	updatedAt: Date
	favorited: false
	favoritesCount: number
	author: {
		username: string
		bio: string
		image: imgURL
		following: false
	}
}

export default IArticle
