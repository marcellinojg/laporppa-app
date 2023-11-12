import { useForm, SubmitHandler } from "react-hook-form"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import capitalize from "../../../../helpers/capitalize"
import { SectionTitle } from "../../../common/Typography"
import { PrimaryButton } from "../../../form/Button"
import Pendidikan from "../../../../consts/pendidikan"
import { InputText } from "../../../form/Input"

interface DetailKlien {
    nama_lengkap : string
    nik : string
    alamat_domisili: string
    nomor_kk : string
    alamat_kk : string
    no_telp: string
    tempat_lahir: string
    tanggal_lahir: string
    usia: number
    jenis_kelamin : string
    agama : string
    pekerjaan: string
    penghasilan_per_bulan : string
    status_perkawinan : string
    kepemilikan_bpjs: string
    pendidikan: Pendidikan
    kelas : string
    nama_sekolah: string
    jurusan_sekolah: string
    tahun_lulus: string
}

const FormDetailKlien = (props: FormModal) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailKlien>()

    const onSubmit: SubmitHandler<DetailKlien> = (data: DetailKlien) => {
        console.log(data)
    }
    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Detail Klien</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Detail Klien</SectionTitle>
                <InputText
                    register={register}
                    errors={errors}
                    name="Test"
                    placeholder="Test"
                    label="test"
                />
            </form>
            <PrimaryButton className="py-2" isSubmit>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailKlien