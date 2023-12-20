import { Role } from "../consts/role"
import { UserAccount } from "../consts/user"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getRoles = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/roles')
    const roles = res.data.data as Role[]
    return roles
}

export const getUsers = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/users')
    const listUsers = res.data.data as UserAccount[]
    return listUsers
}

export const postUser = async (user: UserAccount) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/users', user, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedUser = res.data.data as UserAccount
    return postedUser
}

export const patchUser = async (data: any, id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.patch(`/users/${id}`, data)
    const patchedUser = res.data.data as UserAccount
    return patchedUser
}