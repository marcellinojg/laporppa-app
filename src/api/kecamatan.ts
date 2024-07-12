import { Kecamatan } from "../consts/kecamatan"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"


// export const getKecamatans = async () => {
//     const instance = CreatePublicAxiosInstance()
//     const res = await instance.get('/m-kecamatan')
//     const kecamatans = res.data.data as Kecamatan[]
//     return kecamatans
// }

export const getKecamatans = async () => {
    const instance = CreatePublicAxiosInstance();
    const res = await instance.get('/m-kecamatan');
    const kecamatans = res.data.data as Kecamatan[];
    const filteredKecamatans = kecamatans.filter(kecamatan => kecamatan.id_kabupaten === 1);
    return filteredKecamatans;
}