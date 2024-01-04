import { TGetArticles } from '../types'
import IArticle from './../types/articles/article'

class ApiService {
	baseURL = 'https://blog.kata.academy/api'

	async getArticles(): Promise<TGetArticles> {
		try {
			const response = await fetch(`${this.baseURL}/articles`)
			const json = await response.json()
			const { articles, articlesCount } = json as {
				articles: IArticle[]
				articlesCount: number
			}
			return { articles, articlesCount }
		} catch (error) {
			console.error(error)
			return { error }
		}
	}
}

export default new ApiService()
