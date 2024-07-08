import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import { User, UserAccount } from "../../../consts/user";
import useLoader from "../../../hooks/useLoader";
import { useAlert } from "../../../hooks/useAlert";
import { SubmitHandler, useForm } from "react-hook-form";
import { patchUser } from "../../../api/user";
import { ALERT_TYPE } from "../../../consts/alert";
import { PrimaryButton, SecondaryButton } from "../../form/Button";
import { InputText } from "../../form/Input";
import { Select } from "../../form/Dropdown";
import { Role } from "../../../consts/role";
import { Kelurahan } from "../../../consts/kelurahan";
import { Kecamatan } from "../../../consts/kecamatan";
import { KecamatanLoader, KelurahanLoader, RoleLoader, UserLoader } from "../../../helpers/fetchHelpers";
import { REGEX } from "../../../consts/regex";
import { useAuthUser } from "react-auth-kit";

interface ModalTambahSatgasProps {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  userAccount: UserAccount;
  setRefetch?: Dispatch<SetStateAction<boolean>>;
}

const ModalTambahSatgas = (props: ModalTambahSatgasProps) => {
  const userData = useAuthUser()() as User;
  const { setIsModalActive, userAccount, setRefetch } = props;
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => setIsModalActive(false));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const form = useForm<UserAccount>();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [roles, setRoles] = useState<Role[]>([])
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])
  const [kecamatans, setKecamatans] = useState<Kecamatan[]>([]);
  const [isKelurahanDisabled, setIsKelurahanDisabled] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [user, setUser] = useState<UserAccount>()

  useEffect(() => {
    const kecamatanId = form.watch("kecamatan_id");
    setSelectedKecamatan(kecamatanId || null);
    setIsKelurahanDisabled(!kecamatanId);
  }, [form.watch("kecamatan_id")]);


  const onSubmit: SubmitHandler<UserAccount> = async (data: UserAccount) => {
    const formatData: UserAccount = {
      ...data,
    };

    try {
      setIsLoading(true);
      showLoader();
      (await patchUser(formatData, userAccount.id)) as UserAccount;
      reset();
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Akun Berhasil Diedit !",
        message: `Akun ${userAccount.nama} berhasil diedit !`,
      });

      hideLoader();
      setRefetch!(true);
      setIsModalActive(false);
    } catch {
      errorFetchAlert();
    } finally {
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <>
      <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
        <div
          ref={modalRef}
          className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 max-h-[90vh] overflow-auto rounded-md"
        >
          <RoleLoader data={roles} setData={setRoles}>
            <KecamatanLoader data={kecamatans} setData={setKecamatans}>
              <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                <UserLoader data={user} setData={setUser} id={userData?.id}>
                  {/* <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md"> */}
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">
                        Tambah Akun Satgas dan Admin
                      </h1>
                      <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                          <InputSection title="">
                            <InputText
                              name="nama"
                              register={register}
                              placeholder="Masukkan Nama Lengkap"
                              errorLabel="Nama Lengkap"
                              errors={errors}
                              label="Nama Lengkap"
                              isRequired
                              defaultValue={userAccount.nama}
                            />
                            <InputText
                              name="no_telp"
                              register={register}
                              placeholder="Masukkan nomor telepon"
                              errorLabel="Nomor Telepon"
                              errors={errors}
                              label="Nomor Telepon"
                              isRequired
                              regex={REGEX.PHONE_IDN}
                              type="number"
                              defaultValue={userAccount.no_telp.toString()}
                            />
                            {/* <Select
                            name="kecamatan_id"
                            control={control}
                            placeholder="Pilih kecamatan"
                            label="Kecamatan Klien"
                            errors={errors}
                            errorLabel="Kecamatan"
                            options={kecamatans
                              .filter((k) => k.is_active === true && k.id_kabupaten === 1)
                              .map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                            defaultValue={userAccount?.kelurahan.id_kecamatan}
                          /> */}
                            {/* <Select
                              // isDisabled={
                              //   selectedKecamatan
                              //     ? false
                              //     : userAccount?.kelurahan.id_kecamatan
                              //       ? false
                              //       : true
                              // }
                              name="kelurahan_id"
                              placeholder="Pilih kelurahan"
                              label="Kelurahan Tempat Bertugas"
                              control={control}
                              errors={errors}
                              errorLabel="Kelurahan"
                              options={kelurahans
                                .filter((k) => k.is_active === true)
                                .map((k) => ({
                                  label: k.name,
                                  value: k.id,
                                }))}
                              defaultValue={userAccount?.kelurahan?.id}
                              isRequired
                            /> */}
                            {/* <Select
                                name="kecamatan_id"
                                control={control}
                                placeholder="Pilih Kecamatan tempat bertugas"
                                label="Kecamatan Bertugas"
                                errors={errors}
                                errorLabel="Kecamatan"
                                options={kecamatans.map((k) => ({
                                  label: k.nama,
                                  value: k.id,
                                }))}
                                isRequired
                                defaultValue={userAccount.kelurahan.kecamatan?.id}
                              /> */}
                            <InputText
                              name="kelurahan"
                              register={register}
                              placeholder="Kelurahan Tempat Bertugas"
                              errorLabel="Kelurahan Tempat Bertugas"
                              errors={errors}
                              label="Kelurahan Tempat Bertugas"
                              defaultValue={user?.kelurahan.nama}
                              isDisabled
                              isRequired
                            // defaultValue={laporanEdit?.alamat_pelapor}
                            />
                            <Select
                              name="role_id"
                              control={control}
                              placeholder="Pilih Role"
                              label="Role"
                              errorLabel="Role"
                              errors={errors}
                              defaultValue={userAccount.role.id}
                              options={roles.map((r) => ({
                                label: r.nama,
                                value: r.id,
                              }))}
                              isRequired
                            />
                            <InputText
                              name="username"
                              register={register}
                              placeholder="Masukkan username"
                              errors={errors}
                              label="Username"
                              isRequired
                              defaultValue={userAccount.username}
                            />
                          </InputSection>
                        </div>
                        {/* Footer */}
                        <div className="grid grid-cols-1 border-t-2 border-slate-400 pt-5 gap-3">
                          <SecondaryButton
                            className="py-2"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            onClick={() => setIsModalActive(false)}
                          >
                            Batal
                          </SecondaryButton>
                          <PrimaryButton
                            className="py-2"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            isSubmit
                          >
                            Edit Satgas / Admin Kelurahan
                          </PrimaryButton>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* </div> */}
                </UserLoader>
              </KelurahanLoader>
            </KecamatanLoader>
          </RoleLoader>{" "}
        </div>
      </div>
    </>
  );
};

interface InputSectionProps {
  title?: string;
  children: ReactNode;
}

const InputSection = (props: InputSectionProps) => {
  const { title, children } = props;
  return (
    <section className="border-b-[1px] border-slate-400 py-5">
      {title && (
        <h2 className="font-bold mb-3 text-lg text-primary">{title}</h2>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
};

export default ModalTambahSatgas;