import { FieldValues, useForm } from "react-hook-form"
import AdminLayout from "../layouts/AdminLayout"
import { InputText } from "../../components/form/Input"
import { PrimaryButton } from "../../components/form/Button"

import { Select } from "../../components/form/Dropdown"


const TambahSatgasAdmin = () => {
    const { register, formState: { errors }, handleSubmit, control, watch, setValue } = useForm()

    const onSubmit = (data: FieldValues) => {
        console.log(data.cek_pengaduan)
    }

    
    return <AdminLayout>
        <div className="bg-white p-8 floating-shadow-md mt- md:w-3/4 w-11/12 mx-auto text-center rounded-md">
            <h1 className="font-bold text-2xl mt-2">Tambahkan Satgas / Admin</h1>
            <h2 className="mt-2 text-slate-500 font-bold">Masukkan Nama Satgas / Admin Baru</h2>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex md:flex-row flex-col items-start md:w-3/4 w-12/12 mx-auto mt-12 gap-2">
                    <div className="w-full">
                        <Select
                            name="kategori_id"
                            control={control}
                            placeholder="Pilih Kategori Akun"
                            label="Kategori Akun"
                            errorLabel="Kategori Akun"
                            errors={errors}
                            defaultValue={" "}
                            options={[
                                { label: "Satgas", value: "Satgas" },
                                { label: "Admin Kelurahan", value: "Admin Kelurahan" },
                              ]}
                        />
                        <InputText
                            name="cek_pengaduan"
                            className="w-full text-left"
                            label=""
                            isRequired={true}
                            placeholder="Masukkan Nama Satgas / Admin baru"
                            register={register}
                            errors={errors}
                        />
                         <InputText
                            name="cek_pengaduan"
                            className="w-full text-left"
                            label=""
                            isRequired={true}
                            placeholder="Masukkan Username"
                            register={register}
                            errors={errors}
                        />
                        <InputText
                            name="cek_pengaduan"
                            className="w-full text-left"
                            label=""
                            isRequired={true}
                            placeholder="Masukkan Password"
                            register={register}
                            errors={errors}
                        />
                        <InputText
                            name="cek_pengaduan"
                            className="w-full text-left"
                            label=""
                            isRequired={true}
                            placeholder="Masukkan Kelurahan"
                            register={register}
                            errors={errors}
                        />
                        <PrimaryButton
                        isSubmit={true}
                        className="md:w-1/6 w-11/12 rounded-lg  py-2 mt-4 mb-1"
                        >
                        Buat Akun
                    </PrimaryButton>
                    </div>
                    
                </div>
            </form>
            <img src="/images/search.png" width={600} className="mx-auto" alt="Search illustration" />
        </div>
    </AdminLayout>
}

export default TambahSatgasAdmin