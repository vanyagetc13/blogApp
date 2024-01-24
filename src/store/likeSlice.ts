import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/apiService'
import { IArticle } from '../types'

type TInitialState = {
	loading: boolean
	error: string | null
}
const initialState: TInitialState = {
	loading: false,
	error: null,
}

const postLike = createAsyncThunk(
	'likes/post',
	async ({
		slug,
		token,
	}: {
		slug: string
		token: string
	}): Promise<{ article?: IArticle; error?: string }> => {
		const res = await apiService.articleLike(slug, token, 'POST')
		return res
	}
)

const deleteLike = createAsyncThunk(
	'likes/delete',
	async ({ slug, token }: { slug: string; token: string }) => {
		const res = await apiService.articleLike(slug, token, 'DELETE')
		return res
	}
)

const likeSlice = createSlice({
	name: 'likes',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// post like
		builder.addCase(postLike.pending, (state) => {
			state.error = null
			state.loading = true
		})
		builder.addCase(postLike.fulfilled, (state, action) => {
			const { error } = action.payload
			if (error) state.error = error
			state.loading = false
		})
		// delete like
		builder.addCase(deleteLike.pending, (state) => {
			state.error = null
			state.loading = true
		})
		builder.addCase(deleteLike.fulfilled, (state, action) => {
			const { error } = action.payload
			if (error) state.error = error
			state.loading = false
		})
	},
})

export { postLike, deleteLike }
export default likeSlice.reducer
