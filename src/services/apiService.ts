/* eslint-disable indent */
import { IArticleForm } from '../components/ArticleForm/ArticleForm'
import { ILoginForm } from '../pages/SignInPage/SignInPage'
import { IUser, IRegisterForm } from '../types'
import IArticle from '../types/article'
import IProfile from '../types/profile'

class ApiService {
	baseURL = 'https://blog.kata.academy/api'

	async getArticles(
		limit = 10,
		offset = 0,
		token: string | undefined
	): Promise<{
		articles: IArticle[]
		articlesCount: number
		error: unknown
	}> {
		try {
			const response = await fetch(
				`${this.baseURL}/articles?limit=${limit}&offset=${offset}`,
				{
					headers: token
						? {
								Authorization: 'Token ' + token,
							}
						: undefined,
				}
			)
			const json = await response.json()
			const { articles, articlesCount } = json as {
				articles: IArticle[]
				articlesCount: number
			}
			return { articles, articlesCount, error: false }
		} catch (error) {
			return { error, articles: [], articlesCount: 0 }
		}
	}

	async getArticleBySlug(
		slug: IArticle['slug']
	): Promise<IArticle | unknown> {
		try {
			const response = await fetch(`${this.baseURL}/articles/${slug}`)
			const json = (await response.json()) as { article: IArticle }
			const { article } = json
			return article
		} catch (error) {
			return { error }
		}
	}

	async getCurrentUser(token: string): Promise<IUser | null> {
		try {
			const response = await fetch(`${this.baseURL}/user`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			const { user } = (await response.json()) as { user: IUser }
			return user
		} catch (err) {
			return null
		}
	}

	async registerUser(
		user: Pick<IUser, 'username' | 'email' | 'password'>
	): Promise<{ user?: IUser; errors?: Partial<IRegisterForm> }> {
		const response = await fetch(`${this.baseURL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user }),
		})
		const json = (await response.json()) as
			| { user: IUser }
			| { errors: Partial<IRegisterForm> }
		return json
	}

	async loginUser(
		user: Pick<Required<IUser>, 'email' | 'password'>
	): Promise<{ user?: IUser; errors?: Partial<ILoginForm> }> {
		const response = await fetch(`${this.baseURL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
		})
		if (response.ok) {
			const json = (await response.json()) as { user: IUser }
			return json
		}
		const json = (await response.json()) as { errors: Partial<ILoginForm> }
		return json
	}

	async getProfile(username: IUser['username']): Promise<IProfile> {
		const response = await fetch(`${this.baseURL}/profiles/${username}`)
		const { profile } = (await response.json()) as {
			profile: IProfile
		}
		return profile
	}

	async createArticle(
		article: IArticleForm,
		token: IUser['token']
	): Promise<IArticle> {
		const response = await fetch(`${this.baseURL}/articles`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ article }),
		})
		const { Article } = (await response.json()) as { Article: IArticle }
		return Article
	}
	async editArticle(
		article: IArticleForm,
		slug: string,
		token: string
	): Promise<IArticle> {
		const response = await fetch(`${this.baseURL}/articles/${slug}`, {
			method: 'PUT',
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ article }),
		})
		console.log(response)
		const { Article } = (await response.json()) as { Article: IArticle }
		return Article
	}
}

export default new ApiService()
