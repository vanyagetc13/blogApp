import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import articleReducer from './articleSlice'

const store = configureStore({
	reducer: articleReducer,
	middleware: (gdm) => gdm().concat(thunk),
})

export default store
