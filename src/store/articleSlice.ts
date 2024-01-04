import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/apiService'
import IArticle from './../types/articles/article'

interface IInitialState {
	loading: boolean
	articles: IArticle[]
}

const initialState: IInitialState = {
	loading: false,
	articles: [],
}

const getArticles = createAsyncThunk('article/getArticles', async () => {
	const articles = await apiService.getArticles()
	return articles
})

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getArticles.fulfilled, (store, action) => {
			store
		})
	},
})

export default articleSlice.reducer
