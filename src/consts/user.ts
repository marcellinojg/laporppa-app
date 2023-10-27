
export interface UserLogin {
    username: string,
    password: string,
}

export interface User {
    id: string,
    token: string,
    name: string,
    role: string,
    username: string,
}