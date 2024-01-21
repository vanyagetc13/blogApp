import IUser from './user'

export interface IRegisterForm
	extends Pick<IUser, 'email' | 'password' | 'username'> {
	passwordRepeated: string
	agreement: boolean
}
