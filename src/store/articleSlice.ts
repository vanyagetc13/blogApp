import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/apiService'
import IArticle from '../types/article'
import { IArticleForm } from '../components/ArticleForm/ArticleForm'
import { IUser } from '../types'

interface ArticleBySlug {
	loading: boolean
	article: IArticle | null
}

interface IInitialState {
	loading: boolean
	error: string
	articles: IArticle[]
	articlesCount: number
	articleBySlug: ArticleBySlug
}

const initialState: IInitialState = {
	loading: false,
	error: '',
	articles: [],
	articlesCount: 0,
	articleBySlug: {
		loading: true,
		article: null,
	},
}

interface getArticlesPayload {
	limit?: number
	offset?: number
	token?: string
}

const getArticles = createAsyncThunk(
	'article/get',
	async (payload: getArticlesPayload | undefined) => {
		const limit = payload?.limit
		const offset = payload?.offset
		const token = payload?.token
		const response = await apiService.getArticles(limit, offset, token)
		return response
	}
)

interface getArticleBySlugPayload {
	slug: string
	token?: string
}

const getArticleBySlug = createAsyncThunk(
	'article/getBySlug',
	async (
		payload: getArticleBySlugPayload
	): Promise<{ article: IArticle | null; error: string }> => {
		const res = await apiService.getArticleBySlug(
			payload.slug,
			payload.token
		)
		if ('article' in res) return { article: res.article, error: '' }
		return { article: null, error: 'Not found' }
	}
)

const createArticle = createAsyncThunk(
	'article/create',
	async ({
		article,
		token,
	}: {
		article: IArticleForm
		token: IUser['token']
	}) => {
		const res = await apiService.createArticle(article, token)
		return res
	}
)
const editArticle = createAsyncThunk(
	'article/edit',
	async ({
		article,
		slug,
		token,
	}: {
		article: IArticleForm
		slug: string
		token: string
	}) => {
		const res = await apiService.editArticle(article, slug, token)
		return res
	}
)

const deleteArticle = createAsyncThunk(
	'article/delete',
	async ({ slug, token }: { slug: string; token: string }) => {
		const ok = await apiService.deleteArticle(slug, token)
		return ok
	}
)

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		toggleLike: (state, action) => {
			const idx = state.articles.findIndex(
				(article) => article.slug === action.payload
			)
			const newArticles = [...state.articles]
			const count = newArticles[idx].favoritesCount
			const article = {
				...newArticles[idx],
				favorited: !newArticles[idx].favorited,
				favoritesCount: newArticles[idx].favorited
					? count - 1
					: count + 1,
			}
			newArticles.splice(idx, 1, article)
			if (state.articles) state.articles = newArticles
			if (state.articleBySlug.article)
				state.articleBySlug.article = {
					...state.articleBySlug.article,
					favorited: !state.articleBySlug.article.favorited,
					favoritesCount: state.articleBySlug.article.favorited
						? state.articleBySlug.article.favoritesCount - 1
						: state.articleBySlug.article.favoritesCount + 1,
				}
		},
	},
	extraReducers: (builder) => {
		// get Articles
		builder.addCase(getArticles.pending, (store) => {
			store.loading = true
			store.error = ''
		})
		builder.addCase(getArticles.fulfilled, (state, action) => {
			state.articles = action.payload.articles
			state.articlesCount = action.payload.articlesCount
			state.loading = false
		})
		// by slug article
		builder.addCase(getArticleBySlug.pending, (state) => {
			state.articleBySlug.loading = true
			state.error = ''
		})
		builder.addCase(getArticleBySlug.fulfilled, (state, action) => {
			state.articleBySlug.article = action.payload.article
			state.error = action.payload.error
			state.articleBySlug.loading = false
		})
		// create article
		builder.addCase(createArticle.pending, (state) => {
			state.loading = true
			state.error = ''
		})
		builder.addCase(createArticle.fulfilled, (state) => {
			state.loading = false
		})
		// edit article
		builder.addCase(editArticle.pending, (state) => {
			state.loading = true
			state.error = ''
		})
		builder.addCase(editArticle.fulfilled, (state) => {
			state.loading = false
		})
		// delete article
		builder.addCase(deleteArticle.pending, (state) => {
			state.loading = true
		})
		builder.addCase(deleteArticle.fulfilled, (state, action) => {
			state.loading = false
			if (!action.payload) state.error = 'Did not delete the article'
		})
	},
})

export {
	getArticles,
	getArticleBySlug,
	createArticle,
	editArticle,
	deleteArticle,
}
export const { toggleLike } = articleSlice.actions
export default articleSlice.reducer
