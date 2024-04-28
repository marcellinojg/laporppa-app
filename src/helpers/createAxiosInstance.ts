import axios from "axios";
import { BASE_URL, PUBLIC_BASE_URL } from "../consts/api";

export const CreateAxiosInstance = (token = localStorage.getItem('accessToken')) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
            'Authorization': token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
        }
    })
    return instance
}

export const CreatePublicAxiosInstance = () => {
    const instance = axios.create({
        baseURL: PUBLIC_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return instance
}
