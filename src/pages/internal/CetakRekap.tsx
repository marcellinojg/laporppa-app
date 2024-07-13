import { useState } from "react"
import AdminLayout from "../layouts/AdminLayout"
import { SubmitHandler, useForm } from "react-hook-form"
import { KategoriKasusesLoader, KategoriLoader, KecamatanLoader, PendidikanLoader } from "../../helpers/fetchHelpers"
import { PrimaryButton } from "../../components/form/Button"
import useLoader from "../../hooks/useLoader"
import { useAlert } from "../../hooks/useAlert"
import generateRekap from "../../helpers/generateExcel"
import Datepicker from "../../components/form/Datepicker"
import { Select } from "../../components/form/Dropdown"
import Pendidikan from "../../consts/pendidikan"
import { Kecamatan } from "../../consts/kecamatan"
import apiService from "../../helpers/constructGetRekap"
import { ALERT_TYPE } from "../../consts/alert"
import { Checkbox } from "../../components/form/Checkbox"

interface RekapKasusKlien {
    periode_tanggal: string,
    kategori_klien: string,
    kategori_id: string,
    kategori_kasus_klien_id: string,
    pendidikan: string,
    kecamatan_id: string,
    start_date: Date | null,
    end_date: Date | null
}

const CetakRekap = () => {
    const { showLoader, hideLoader } = useLoader()
    const [period, setPeriod] = useState<string>('');
    const [selectAll, setSelectAll] = useState(false);
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [kategoriKasuses, setKategoriKasuses] = useState<KategoriKasus[]>([])
    const { errorFetchAlert, addAlert } = useAlert();
    const {
        formState: { errors },
        handleSubmit,
        control,
        reset,
        watch,
      } = useForm<RekapKasusKlien>();

    const form = useForm()

    const selectedKategoriId = watch("kategori_id");

    const filteredKategoriKasuses = kategoriKasuses.filter(
        (kasus) => kasus.id_tipe_permasalahan === selectedKategoriId
    );

    const displayKategoriKasuses = filteredKategoriKasuses.length > 0 ? filteredKategoriKasuses : kategoriKasuses;

    const handleTahun = (newPeriod: string) => {
        setPeriod(newPeriod);
    };

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
    };

    const start_date = watch("start_date");
    const end_date = watch("end_date");

    const onSubmit: SubmitHandler<RekapKasusKlien> = async (data) => {
        try {
            showLoader();
            const result = await apiService.getRekap(
                period,
                start_date?.toISOString().split('T')[0],
                end_date?.toISOString().split('T')[0],
                data.kategori_kasus_klien_id,
                data.kategori_id
            );

            console.log(result)
            try {
                await generateRekap(result); 
            } catch (error){
                reset();
                console.log(error)
                addAlert({
                    type: ALERT_TYPE.ERROR,
                    title: "Gagal Membuat Rekap Data!",
                    message: `Terjadi kesalahan saat proses rekap`,
                  });
            }
            
        } catch (error) {
            errorFetchAlert();
        } finally {
            hideLoader();
        }
    };
    return (
        <AdminLayout>
            <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-2xl text-primary">
                            Rekap Laporan
                        </h1>
                    </div>
                    <h2 className="font-semibold text-xl">Periode Rekap : </h2>
                    <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === 'Pilih Tanggal' && 'border-red-800'}`}
                            onClick={() => handleTahun('tahun')}
                        >
                            Tahunan
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === 'Pilih Tanggal' && 'border-red-800'}`}
                            onClick={() => handleTahun('bulan')}
                        >
                            Bulanan
                        </button>
                    </div>
                       {period === 'tahun' && (
                        <div className="flex items-center gap-3 mt-3">
                            <Datepicker
                                name="tahun_awal"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Tahun Awal Rekap"
                                label="Tahun Awal"
                            />
                            <Datepicker
                                name="tahun_akhir"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Tahun Akhir Rekap"
                                label="Tahun Akhir"
                            />
                        </div>
                    )}
                    {period === 'bulan' && (
                        <div className="flex items-center gap-3 mt-3">
                            <Datepicker
                                name="bulan_awal"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Bulan Awal Rekap"
                                label="Bulan Awal"
                            />
                            <Datepicker
                                name="bulan_akhir"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Bulan Akhir Rekap"
                                label="Bulan Akhir"
                            />
                        </div>
                    )}
                    
                    <h2 className="font-semibold text-xl">Detail Rekap : </h2>
                       <div className="flex flex-col gap-2 py-3">
                       <form
                         className="border-b-2 flex flex-col gap-3 py-3"
                         onSubmit={handleSubmit(onSubmit)}
                       >
                            <span className="mb-3 font-semibold italic text-rose-800">*Kosongkan apabila tidak membutuhkan detail tersebut pada rekap</span>
                            <div className="flex items-center">
                                <div className="flex-1 mr-4">
                                <KategoriLoader data={kategoris} setData={setKategoris} >
                                    <Select
                                        name="kategori_id"
                                        control={control}
                                        placeholder="Pilih Tipe Permasalahan"
                                        label="Tipe Permasalahan"
                                        errorLabel="Tipe Permasalahan"
                                        errors={errors}
                                        options={kategoris.map((k) => ({
                                            label: k.name,
                                            value: k.id,
                                        }))}
                                        isRequired={false}
                                        isDisabled={selectAll} 
                                    />
                                </KategoriLoader>
                                                    </div>
                            
                                <label className="flex items-center">
                                <Checkbox
                                        wrapperClass="mt-10 mb-4"
                                        name="all_kategori"
                                        form={form}
                                        label="Semua"
                                        isRequired={false}
                                        />
                                </label>
                            </div>
                            <div className="flex items-center">
                            <div className="flex-1 mr-4">
                            <KategoriKasusesLoader data={kategoriKasuses} setData={setKategoriKasuses}>
                                    <Select
                                        name="kategori_kasus_klien_id"
                                        control={control}
                                        placeholder="Pilih Kategori Kasus Permasalahan"
                                        label="Kategori Kasus Permasalahan"
                                        errors={errors}
                                        errorLabel="Kategori Kasus"
                                        options={displayKategoriKasuses.map((k) => ({
                                            label: k.name,
                                            value: k.id,
                                        }))}
                                        isRequired={false}
                                        isDisabled={selectAll}
                                    />
                                </KategoriKasusesLoader>
                                </div>
                                <Checkbox
                                        wrapperClass="mt-10 mb-4"
                                        name="all_kasus"
                                        form={form}
                                        label="Semua"
                                        isRequired={false}
                                        />
                               
                                </div>
                                  
                    </form>
                        </div>
                   
                     <div className="d-flex justify-content-center mt-5">
                        <PrimaryButton className="py-2" onClick={handleSubmit(onSubmit)}>
                            Unduh Excel
                        </PrimaryButton>
                    </div>               
                </div>
            </div>
        </AdminLayout>
    )
}

export default CetakRekap
