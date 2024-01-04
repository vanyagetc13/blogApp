import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types'

interface IInitialState {
	token: string
	currentUser: null | IUser
	loading: boolean
}

const initialState: IInitialState = {
	token: '',
	currentUser: null,
	loading: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
})

export default authSlice.reducer
