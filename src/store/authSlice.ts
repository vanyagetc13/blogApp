import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IRegisterForm, IUser } from '../types'
import apiService from '../services/apiService'

interface LoginFormErrors {
	'email or password'?: string
}

interface IInitialState {
	currentUser: IUser | null
	loading: boolean
	errors: Partial<IRegisterForm> | LoginFormErrors | null
}

const initialState: IInitialState = {
	currentUser: null,
	loading: false,
	errors: null,
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

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state) => {
			state.currentUser = null
			state.loading = false
			state.errors = null
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
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			if (action.payload.errors) state.errors = action.payload.errors
			if (action.payload.user) state.currentUser = action.payload.user
			state.loading = false
		})
		// Login
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload.errors) state.errors = action.payload.errors
			if (action.payload.user) state.currentUser = action.payload.user
			state.loading = false
		})
	},
})

export const { logOut } = authSlice.actions
export { getCurrentUser, registerUser, loginUser }
export default authSlice.reducer
