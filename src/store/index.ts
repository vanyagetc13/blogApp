import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articleReducer from './articleSlice'
import authReducer from './authSlice'
import likeReducer from './likeSlice'

const reducer = combineReducers({
	articles: articleReducer,
	auth: authReducer,
	likes: likeReducer,
})

const store = configureStore({
	reducer,
	middleware: (gdm) => gdm().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
