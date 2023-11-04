import { FieldValues, useForm } from "react-hook-form"
import AdminLayout from "../layouts/AdminLayout"
import { InputText } from "../../components/form/Input"
import { PrimaryButton } from "../../components/form/Button"


const CekPelaporan = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const onSubmit = (data: FieldValues) => {
        console.log(data.cek_pengaduan)
    }

    
    return <AdminLayout>
        <div className="bg-white p-8 floating-shadow-md mt-4 md:w-3/4 w-11/12 mx-auto text-center rounded-md">
            <h1 className="font-bold text-2xl">Cek Pelaporan</h1>
            <h2 className="mt-2 text-slate-500 font-bold">Masukkan Nomor Registrasi, NIK, atau nomor identitas untuk melacak progres pengaduan</h2>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex md:flex-row flex-col items-start md:w-3/4 w-12/12 mx-auto mt-12 gap-2">
                    <div className="grow w-full">
                        <InputText
                            name="cek_pengaduan"
                            className="w-full text-center"
                            label=""
                            isRequired={true}
                            placeholder="Masukkan nomor"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <PrimaryButton
                        isSubmit={true}
                        className="md:w-1/6 w-11/12 rounded-lg  py-2 mb-1"
                    >
                        Search
                    </PrimaryButton>
                </div>
            </form>
            <img src="/images/search.png" width={600} className="mx-auto" alt="Search illustration" />
        </div>
    </AdminLayout>
}

export default CekPelaporan