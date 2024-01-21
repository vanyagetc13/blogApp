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
	loading: true,
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
	slug: IArticle['slug']
}

const getArticleBySlug = createAsyncThunk(
	'article/getBySlug',
	async (payload: getArticleBySlugPayload): Promise<IArticle> => {
		const article = await apiService.getArticleBySlug(payload.slug)
		return article as IArticle
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
		console.log(res)
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
		console.log(res)
	}
)

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// get Articles
		builder.addCase(getArticles.pending, (store) => {
			store.loading = true
		})
		builder.addCase(getArticles.fulfilled, (store, action) => {
			store.articles = action.payload.articles
			store.articlesCount = action.payload.articlesCount
			store.loading = false
		})
		// by slug article
		builder.addCase(getArticleBySlug.pending, (store) => {
			store.articleBySlug.loading = true
		})
		builder.addCase(getArticleBySlug.fulfilled, (store, action) => {
			store.articleBySlug.article = action.payload
			store.articleBySlug.loading = false
		})
		// create article
		builder.addCase(createArticle.pending, (store) => {
			store.loading = true
		})
		builder.addCase(createArticle.fulfilled, (store) => {
			store.loading = false
		})
		// edit article
		builder.addCase(editArticle.pending, (state) => {
			state.loading = true
		})
		builder.addCase(editArticle.fulfilled, (state) => {
			state.loading = false
		})
	},
})

export { getArticles, getArticleBySlug, createArticle, editArticle }
export default articleSlice.reducer
