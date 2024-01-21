import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import store from './store'
import App from './App'
import './index.scss'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import Page404 from './pages/Page404/Page404'
import ArticleSlugPage from './pages/ArticleSlugPage/ArticleSlugPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage'
import ProfileMePage from './pages/ProfileMePage/ProfileMePage'
import NewArticlePage from './pages/NewArticlePage/NewArticlePage'
import ArticleEditPage from './pages/ArticleEditPage/ArticleEditPage'

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
			{
				path: '/articles/:slug',
				element: <ArticleSlugPage />,
			},
			{
				path: '/articles/:slug/edit',
				element: <ArticleEditPage />,
			},
			{
				path: '/sign-up',
				element: <SignUpPage />,
			},
			{
				path: '/sign-in',
				element: <SignInPage />,
			},
			{ path: '/profiles', element: <ProfileMePage /> },
			{
				path: '/profiles/:username',
				element: <ProfilePage />,
			},
			{
				path: '/profiles/:username/edit',
				element: <ProfileEditPage />,
			},
			{
				path: '/new-article',
				element: <NewArticlePage />,
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
