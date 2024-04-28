import axios from "axios"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

// export const getKategoris = async () => {
//     const instance = CreateAxiosInstance()
//     const res = await instance.get('/public/kategoris')
//     const kategoris = res.data.data as Kategori[]
//     return kategoris
// }

// export const getKategoriKasuses = async () => {
//     const instance = CreateAxiosInstance()
//     const res = await instance.get('/kategori-kasuses')
//     const getKategoriKasuses = res.data.data as Kategori[]
//     return getKategoriKasuses
// }

export const getKategoris = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-tipe-permasalahan')
    const kategoris = res.data.data as Tipe[]
    return kategoris
}

export const getKategoriKasuses = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('m-kategori-kasus')
    const getKategoriKasuses = res.data.data as Kategori[]
    return getKategoriKasuses
}