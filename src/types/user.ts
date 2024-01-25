import { imgURL } from '.'

type JWTToken = string
type email = string

interface IUser {
	email: email
	token?: JWTToken
	username: string
	bio?: string
	image?: imgURL
	password?: string
}

export default IUser
