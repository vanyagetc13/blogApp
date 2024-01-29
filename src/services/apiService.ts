/* eslint-disable indent */
import { IArticleForm } from '../components/ArticleForm/ArticleForm'
import { IProfileForm } from '../components/ProfileForm/ProfileForm'
import { IUser } from '../types'
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
		slug: IArticle['slug'],
		token?: string
	): Promise<{ article: IArticle } | { error: unknown }> {
		try {
			const response = await fetch(`${this.baseURL}/articles/${slug}`, {
				headers: token
					? {
							Authorization: `Token ${token}`,
						}
					: undefined,
			})
			const { article } = (await response.json()) as { article: IArticle }
			return { article }
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
	): Promise<{ user?: IUser; error?: string }> {
		const response = await fetch(`${this.baseURL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user }),
		})
		if (response.ok) {
			const { user } = (await response.json()) as { user: IUser }
			return { user }
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { errors } = (await response.json()) as {
			errors: {
				[key: string]: string
			}
		}
		if ('email' in errors) return { error: 'Email is already taken.' }
		if ('username' in errors) return { error: 'Username is already taken.' }
		return { error: 'Unexpected error.' }
	}

	async loginUser(
		user: Pick<Required<IUser>, 'email' | 'password'>
	): Promise<{ user?: IUser; error?: string }> {
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
		const { errors } = (await response.json()) as {
			errors: {
				[key: string]: string
			}
		}
		if ('email or password' in errors) {
			return { error: 'Email or password is invalid' }
		}
		return { error: '' }
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
		const { article: Article } = (await response.json()) as {
			article: IArticle
		}
		return Article
	}
	async editArticle(
		article: IArticleForm,
		slug: string,
		token: string
	): Promise<{ article?: IArticle; error?: string }> {
		const response = await fetch(`${this.baseURL}/articles/${slug}`, {
			method: 'PUT',
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ article }),
		})
		if (response.ok) {
			const { Article } = (await response.json()) as { Article: IArticle }
			return { article: Article }
		}
		return { error: 'unexpected error' }
	}
	async deleteArticle(slug: string, token: string): Promise<boolean> {
		const response = await fetch(`${this.baseURL}/articles/${slug}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
		})
		return response.ok
	}

	async articleLike(
		slug: string,
		token: string,
		method: 'POST' | 'DELETE'
	): Promise<{ article?: IArticle; error?: string }> {
		const response = await fetch(
			`${this.baseURL}/articles/${slug}/favorite`,
			{
				method,
				headers: {
					Authorization: `Token ${token}`,
				},
			}
		)
		if (response.ok) {
			const { article } = (await response.json()) as { article: IArticle }
			return { article }
		}
		if (response.status === 401)
			return { error: 'You are not authorized. Try to relog.' }
		else return { error: 'Unexpected error.' }
	}

	async updateUser(
		user: Partial<IProfileForm>,
		token: string
	): Promise<IUser | null> {
		const response = await fetch(`${this.baseURL}/user`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ user }),
		})
		const { user: User } = (await response.json()) as { user: IUser }
		if (response.ok) return User
		return null
	}
}

export default new ApiService()
