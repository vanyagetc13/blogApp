import IArticle from '../articles/article'

type errored = {
	error: any
}

type fulfilled = {
	articles: IArticle[]
	articlesCount: number
}

type TGetArticles = fulfilled | errored

export default TGetArticles
