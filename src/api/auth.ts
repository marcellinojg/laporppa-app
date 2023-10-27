import { User, UserLogin } from "../consts/user"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const postLogin = async (props: UserLogin) => {
    const { username, password } = props
    const instance = CreateAxiosInstance()
    const res = await instance.post('/login', {
        username: username,
        password: password
    })
    const data = res.data.data as User
    return data
}

