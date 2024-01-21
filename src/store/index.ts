import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articleReducer from './articleSlice'
import authReducer from './authSlice'

const reducer = combineReducers({
	articles: articleReducer,
	auth: authReducer,
})

const store = configureStore({
	reducer,
	middleware: (gdm) => gdm().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
