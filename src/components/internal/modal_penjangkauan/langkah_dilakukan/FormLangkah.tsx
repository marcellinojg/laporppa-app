import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler,  useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import { useState } from "react"
import { LangkahDilakukan } from "../../../../consts/langkah"

export interface DetailLangkah {
    langkah: string
}

const FormDetailLangkah = (props: FormModal) => {
    const { mode, laporan } = props;
    
    const form = useForm<DetailLangkah>();
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        watch,
        setValue,
      } = form;

      const [langkahs, setLangkahs] = useState<LangkahDilakukan[]>([]);

      const onSubmit: SubmitHandler<DetailLangkah> = (data: DetailLangkah) => {
        console.log(data);

      };

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Langkah yang Telah Dilakukan</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Langkah yang telah Dilakukan</SectionTitle>
                <TextArea
                    name="langkah"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    label="Ceritakan langkah yang dilakukan"
                    placeholder="Contoh : Pada tanggal 1 Januari, satgas mendatangi klien."
                />
            </form>
            <PrimaryButton className="py-2" isSubmit={true} onClick={handleSubmit(onSubmit)}>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailLangkah