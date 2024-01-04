import React from 'react'
import Button from 'antd/es/button'
import { Space } from 'antd'

interface Props {
	auth: boolean
}

const AuthorizedHeadSide = ({ auth }: Props) => {
	if (auth)
		return (
			<Space>
				<Button type="text">Sign In</Button>
				<Button>Sign Up</Button>
			</Space>
		)
	return <div>NOT AuthorizedHeadSide</div>
}

export default AuthorizedHeadSide
