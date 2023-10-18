import axios from "axios";
import { BASE_URL } from "../consts/api";

export const useAxiosInstance = (token = localStorage.getItem('accessToken')) => {
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
