import { Kecamatan } from "./kecamatan"

export interface Kota {
    id: number
    nama: string
    kecamatan?: Kecamatan
}