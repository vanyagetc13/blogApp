import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import store from './store'
import App from './App'
import './index.scss'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import Page404 from './pages/404page/Page404'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Page404 />,
		children: [
			{
				path: '/',
				element: <ArticlesPage />,
			},
			{
				path: '/articles',
				element: <ArticlesPage />,
			},
		],
	},
])

root.render(
	<Provider store={store}>
		<ConfigProvider theme={{}}>
			<RouterProvider router={router} />
		</ConfigProvider>
	</Provider>
)
