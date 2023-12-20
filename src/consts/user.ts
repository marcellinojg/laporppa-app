import { Kelurahan } from "./kelurahan";
import { Role } from "./role";

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

export interface UserAccount {
    id: string,
    username: string,
    nama: string,
    role: Role,
    kelurahan: Kelurahan,
    no_telp: number,
    password: string,
    is_active: string,
}