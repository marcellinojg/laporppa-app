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

const CetakKasusKlien = () => {
    const { showLoader, hideLoader } = useLoader()
    const [period, setPeriod] = useState<string>('semua');
    const [viewMode, setViewMode] = useState<string>('Show All'); 
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [kategoriKasuses, setKategoriKasuses] = useState<KategoriKasus[]>([])
    const [pendidikans, setPendidikans] = useState<Pendidikan[]>([])
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
    const { errorFetchAlert, addAlert } = useAlert();
    const {
        formState: { errors },
        handleSubmit,
        control,
        reset,
        watch,
      } = useForm<RekapKasusKlien>();

    const selectedKategoriId = watch("kategori_id");

    const filteredKategoriKasuses = kategoriKasuses.filter(
        (kasus) => kasus.id_tipe_permasalahan === selectedKategoriId
    );

    const displayKategoriKasuses = filteredKategoriKasuses.length > 0 ? filteredKategoriKasuses : kategoriKasuses;

    const handleTahun = (newPeriod: string) => {
        setPeriod(newPeriod);
    };

    const handleViewMode = (mode: string) => {
        setViewMode(mode);
        reset();
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
                data.kategori_klien,
                data.kategori_kasus_klien_id,
                data.kecamatan_id,
                data.kategori_id
            );

            console.log(result)
            try {
                await generateRekap(result);
                addAlert({
                    type:ALERT_TYPE.SUCCESS,
                    title: "Berhasil mencetak rekap data",
                    message: "Rekap data berhasil dicetak",
                }) 
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
                            Laporan Kasus Klien
                        </h1>
                    </div>
                    <h2 className="font-semibold text-xl">Periode Rekap : </h2>
                    <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === 'Semua Periode' && 'border-red-800'}`}
                            onClick={() => handleTahun('semua')}
                        >
                            Semua Periode
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === 'Bulan Ini' && 'border-red-800'}`}
                            onClick={() => handleTahun('bulanini')}
                        >
                            Bulanan
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === '3 Bulan Terakhir' && 'border-red-800'}`}
                            onClick={() => handleTahun('3bulan')}
                        >
                            3 Bulan Terakhir
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === '1 Tahun Terakhir' && 'border-red-800'}`}
                            onClick={() => handleTahun('1tahun')}
                        >
                            1 Tahun Terakhir
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${period === 'Pilih Tanggal' && 'border-red-800'}`}
                            onClick={() => handleTahun('tanggal')}
                        >
                            Pilih Tanggal
                        </button>
                    </div>
                       {period === 'tanggal' && (
                        <div className="flex items-center gap-3 mt-3">
                            <Datepicker
                                name="start_date"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Tanggal Awal Rekap"
                                label="Tanggal Awal"
                            />
                            <Datepicker
                                name="end_date"
                                control={control}
                                isRequired
                                defaultValue={null}
                                placeholder="Tanggal Akhir Rekap"
                                label="Tanggal Akhir"
                            />
                        </div>
                    )}
                    
                    <h2 className="font-semibold text-xl">Jenis Rekap : </h2>
                    <div className="flex items-center gap-3">
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${viewMode === 'Show All' && 'border-red-800'}`}
                            onClick={() => handleViewMode('all')}
                        >
                            Rekap Keseluruhan
                        </button>
                        <button
                            className={`flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800 focus:border-red-800 active:border-red-800 ${viewMode === 'Detail' && 'border-red-800'}`}
                            onClick={() => handleViewMode('detail')}
                        >
                            Rekap Detail
                        </button>
                    </div>

                    {viewMode === 'detail' && (
                       <div className="flex flex-col gap-2 py-3">
                       <form
                         className="border-b-2 flex flex-col gap-3 py-3"
                         onSubmit={handleSubmit(onSubmit)}
                       >
                            <span className="mb-3 font-semibold italic text-rose-800">*Kosongkan apabila tidak membutuhkan detail tersebut pada rekap</span>
                            <Select
                                name="kategori_klien"
                                control={control}
                                placeholder="Pilih Kategori Klien Permasalahan"
                                label="Kategori Klien Permasalahan"
                                errors={errors}
                                errorLabel="Kategori Klien"
                                options={[{ label: 'Anak-Anak', value: 'anak' }, { label: 'Dewasa', value: 'dewasa' }]}
                                isRequired={false}
                            />
                            <KategoriLoader data={kategoris} setData={setKategoris}>
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
                                />
                    </KategoriLoader>
    
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
                                    />
                                </KategoriKasusesLoader>
                                <KecamatanLoader data={kecamatans} setData={setKecamatans}>
                                    <Select
                                        name="kecamatan_id"
                                        control={control}
                                        placeholder="Pilih Kecamatan"
                                        label="Kecamatan"
                                        errors={errors}
                                        errorLabel="Kecamatan"
                                        options={kecamatans
                                            .filter((k) => k.is_active === true && k.id_kabupaten === 1)
                                            .map((k) => ({
                                              label: k.name,
                                              value: k.id,
                                        }))}
                                        isRequired={false}
                                    />
                                </KecamatanLoader>
                                <PendidikanLoader data={pendidikans} setData={setPendidikans}>
                                    <Select
                                        name="pendidikan"
                                        control={control}
                                        placeholder="Pilih Tingkat Pendidikan Terakhir"
                                        label="Pendidikan Terakhir"
                                        errors={errors}
                                        errorLabel="Pendidikan Terakhir"
                                        options={pendidikans.map((k) => ({
                                            label: k.name,
                                            value: k.id,
                                        }))}
                                        isRequired={false}
                                    />
                            </PendidikanLoader>       
                    </form>
                        </div>
                    )}
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

export default CetakKasusKlien
