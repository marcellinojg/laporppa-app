import { User } from "../consts/user"
import { useAxiosInstance } from "../hooks/useAxiosInstance"
import { LoginProps } from "../consts/login"

export const postLogin = async (props: LoginProps) => {
    const { username, password } = props
    const instance = useAxiosInstance()
    const res = await instance.post('/login', {
        username: username,
        password: password
    })
    const data = res.data.data as User
    return data
}


