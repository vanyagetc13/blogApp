import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types'
import apiService from '../services/apiService'
import { IProfileForm } from '../components/ProfileForm/ProfileForm'

interface IInitialState {
	currentUser: IUser | null
	loading: boolean
	error: string | null
}

const initialState: IInitialState = {
	currentUser: null,
	loading: true,
	error: null,
}

const getCurrentUser = createAsyncThunk(
	'auth/getCurrent',
	async ({ token }: { token: string }) => {
		const user = await apiService.getCurrentUser(token)
		return { user, token }
	}
)

const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({
		user,
	}: {
		user: Pick<IUser, 'email' | 'password' | 'username'>
	}) => {
		const res = await apiService.registerUser(user)
		return res
	}
)

const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (user: Pick<Required<IUser>, 'email' | 'password'>) => {
		const res = await apiService.loginUser(user)
		return res
	}
)
const updateUser = createAsyncThunk(
	'user/update',
	async ({ user, token }: { user: Partial<IProfileForm>; token: string }) => {
		const res = await apiService.updateUser(user, token)
		return res
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state) => {
			state.currentUser = null
			state.loading = false
			state.error = null
		},
		clearError: (state) => {
			state.error = ''
		},
	},
	extraReducers: (builder) => {
		// Get Current
		builder.addCase(getCurrentUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			if (action.payload.user) {
				state.currentUser = action.payload.user
				state.currentUser.token = action.payload.token
			}
			state.loading = false
		})
		// Register
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true
			state.error = null
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			if (action.payload.error) state.error = action.payload.error
			if (action.payload.user) state.currentUser = action.payload.user
			state.loading = false
		})
		// Login
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload.error) state.error = action.payload.error
			if (action.payload.user) state.currentUser = action.payload.user
			state.loading = false
		})
		// update
		builder.addCase(updateUser.pending, (state) => {
			state.loading = true
			state.error = ''
		})
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loading = false
			if (action.payload) state.currentUser = action.payload
		})
	},
})

export const { logOut, clearError } = authSlice.actions
export { getCurrentUser, registerUser, loginUser, updateUser }
export default authSlice.reducer
