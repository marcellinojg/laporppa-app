import { UserLogin } from "../consts/user"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"
import { LoginProps } from "../consts/login"

export const postLogin = async (props: LoginProps) => {
    const { username, password } = props
    const instance = CreateAxiosInstance()
    const res = await instance.post('/login', {
        username: username,
        password: password
    })
    const data = res.data.data as UserLogin
    return data
}

