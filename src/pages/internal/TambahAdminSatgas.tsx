import { FieldValues, useForm } from "react-hook-form";
import AdminLayout from "../layouts/AdminLayout";
import { InputText } from "../../components/form/Input";
import { PrimaryButton } from "../../components/form/Button";
import { Select } from "../../components/form/Dropdown";
import { User, UserAccount } from "../../consts/user";
import { useAlert } from "../../hooks/useAlert";
import { useLocalStorage } from "usehooks-ts";
import { ReactNode, useEffect, useState } from "react";
import useLoader from "../../hooks/useLoader";
import { postUser } from "../../api/user";
import { ALERT_TYPE } from "../../consts/alert";
import { Role } from "../../consts/role";
import { Kelurahan } from "../../consts/kelurahan";
import { REGEX } from "../../consts/regex";
import { KecamatanLoader, KelurahanLoader, RoleLoader, UserLoader, UsersLoader } from "../../helpers/fetchHelpers";
import { AktifkanButton, EditUserButton, NonAktifkanButton, UpdatePasswordButton } from "../../components/form/UserActionButton";
import AutosaveFormEffect from "../../helpers/formSaveHelpers";
import { Kecamatan } from "../../consts/kecamatan";
import ModalTambahSatgas from "../../components/internal/modal_tambah_admin/ModalTambahSatgas";
import ModalUpdatePassword from "../../components/internal/modal_tambah_admin/ModalUpdatePassword";
import { useAuthUser } from "react-auth-kit";
import { format } from "date-fns";

const TambahSatgasAdmin = () => {
  const userData = useAuthUser()() as User;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useLocalStorage<string | null>(
    "form_internal_state",
    null
  );
  const form = useForm<UserAccount>();
  const [refetch, setRefetch] = useState<boolean>(true);
  const {
    setValue,
    watch,
    clearErrors,
    reset,
    setError,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = form;
  const { errorFetchAlert, addAlert } = useAlert();
  const { showLoader, hideLoader } = useLoader();
  const [userAccount, setUserAccount] = useState<UserAccount>()
  const [roles, setRoles] = useState<Role[]>([])
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])
  const [kecamatans, setKecamatans] = useState<Kecamatan[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([])
  const [isKelurahanDisabled, setIsKelurahanDisabled] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isModalUpdatePasswordActive, setIsModalUpdatePasswordActive] = useState<boolean>(false);
  const [curUserAccount, setCurUserAccount] = useState<UserAccount | null>(null)


  useEffect(() => {
    const kecamatanId = form.watch("kecamatan_id");
    setSelectedKecamatan(kecamatanId || null);
    setIsKelurahanDisabled(!kecamatanId);
  }, [form.watch("kecamatan_id")]);

  interface UserAccount {
    id: string,
    username: string,
    nama: string,
    role: Role,
    kelurahan: Kelurahan,
    no_telp: number,
    password?: string,
    is_active: string,
    password_confirm: string,
  }

  const onSubmit = async (data: UserAccount) => {
    if (data?.password != data?.password_confirm) {
      addAlert(
        {
          type: ALERT_TYPE.WARNING,
          title: 'Password Tidak Sesuai !',
          message: 'Pastikan konfirmasi password sesuai !'
        }
      )
    }
    else {
      let formatData: UserAccount = {
        ...data,
      }

      if (userData?.role === "Kelurahan") {
        formatData = {
          ...data,
          kelurahan_id: userAccount?.kelurahan?.id,
          role_id: 1,
        };
      }

      try {
        setIsLoading(true);
        showLoader();
        (await postUser(formatData)) as UserAccount;
        localStorage.removeItem("form_internal_state");
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Akun Berhasil Ditambahkan !",
          message: `Akun ${data.nama} telah berhasil ditambahkan !`,
        });
        hideLoader();
        setRefetch(true);
        // setTimeout(() => {
        // navigate(0);
        // }, 20000)
      } catch {
        // errorFetchAlert();
        addAlert({
          type: ALERT_TYPE.ERROR,
          title: "Akun Gagal Ditambahkan !",
          message: `Pastikan akun belum pernah ditambahkan sebelumnya !`,
        });
      } finally {
        setIsLoading(false);
        hideLoader();
      }

      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <>
      <UsersLoader
        data={users}
        setData={setUsers}
        setRefetch={setRefetch}
        refetch={refetch}
      >
        <AdminLayout>
          <RoleLoader data={roles} setData={setRoles}>
            <KecamatanLoader data={kecamatans} setData={setKecamatans}>
              <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                <UserLoader data={userAccount} setData={setUserAccount} id={userData?.id}>
                  {/* <AutosaveFormEffect
                    setValue={setValue}
                    watch={watch}
                    formState={formState}
                    setFormState={setFormState}
                  > */}
                  <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">
                          {userData.role === "Admin" ? "Tambah Akun Kelurahan / Admin" : "Tambah Akun Satgas"}
                        </h1>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                          <div className="flex flex-col">
                            <InputSection title="">
                              <InputText
                                name="nama"
                                register={register}
                                placeholder="Masukkan nama lengkap"
                                errorLabel="Nama Lengkap"
                                errors={errors}
                                label="Nama Lengkap"
                                isRequired
                              // defaultValue={}
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
                                type='tel'
                              // defaultValue={laporanEdit?.alamat_pelapor}
                              />
                              {
                                userData?.role === "Admin" ?
                                  <>
                                    <Select
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
                                    />
                                    <Select
                                      name="kelurahan_id"
                                      control={control}
                                      placeholder="Pilih kelurahan tempat bertugas"
                                      label="Kelurahan Bertugas"
                                      errorLabel="Kelurahan"
                                      errors={errors}
                                      // defaultValue={roles.id}
                                      options={kelurahans
                                        .filter(
                                          (k) => k.id_kecamatan == selectedKecamatan
                                        )
                                        .map((k) => ({
                                          label: k.name,
                                          value: k.id,
                                        }))}
                                      isRequired
                                      isDisabled={isKelurahanDisabled}
                                    />
                                  </>
                                  :
                                  <>
                                    <InputText
                                      name="kelurahan"
                                      register={register}
                                      placeholder="Kelurahan Tempat Bertugas"
                                      errorLabel="Kelurahan Tempat Bertugas"
                                      errors={errors}
                                      label="Kelurahan Tempat Bertugas"
                                      defaultValue={userAccount?.kelurahan.nama}
                                      isDisabled
                                      isRequired
                                    // defaultValue={laporanEdit?.alamat_pelapor}
                                    />
                                  </>
                              }
                              {
                                userData?.role === "Admin" ?
                                  <>
                                    <Select
                                      name="role_id"
                                      control={control}
                                      placeholder="Pilih Role"
                                      label="Role"
                                      errorLabel="Role"
                                      errors={errors}
                                      // defaultValue={roles.id}
                                      options={roles
                                        .filter((r) => r.nama === "Kelurahan" || r.nama === "Admin")
                                        .map((r) => ({
                                          label: r.nama,
                                          value: r.id,
                                        }))}
                                      isRequired
                                    />
                                  </>
                                  :
                                  <>
                                    <InputText
                                      name="role_id"
                                      register={register}
                                      placeholder="Pilih Role"
                                      errorLabel="Role"
                                      errors={errors}
                                      label="Role"
                                      defaultValue={"Satgas"}
                                      isDisabled
                                      isRequired
                                    // defaultValue={laporanEdit?.alamat_pelapor}
                                    />
                                  </>
                              }
                              <InputText
                                name="username"
                                register={register}
                                placeholder="Masukkan username"
                                errors={errors}
                                label="Username"
                                isRequired
                              // defaultValue={laporanEdit?.nama_pelapor}
                              />
                              <InputText
                                name="password"
                                register={register}
                                placeholder="Masukkan password"
                                errorLabel="Password"
                                errors={errors}
                                label="Password"
                                isRequired
                                obscure
                              // defaultValue={laporanEdit?.alamat_pelapor}
                              />
                              <InputText
                                name="password_confirm"
                                register={register}
                                placeholder="Masukkan password"
                                errorLabel="Password"
                                errors={errors}
                                label="Konfirmasi Password"
                                isRequired
                                obscure
                              // defaultValue={laporanEdit?.alamat_pelapor}
                              />
                            </InputSection>
                          </div>
                          {/* Footer */}
                          <div className="border-t-2 border-slate-400 pt-5">
                            <PrimaryButton
                              className="py-2"
                              isLoading={isLoading}
                              isDisabled={isLoading}
                              isSubmit
                            >
                              {userData?.role == "Admin" ? "Tambah Akun Kelurahan / Admin" : "Tambah Akun Satgas"}
                            </PrimaryButton>
                          </div>
                        </form>
                      </div>
                      {/* col 2 */}
                      <div className="w-full overflow-auto">
                        <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary mt-5">
                          Daftar Akun
                        </h1>
                        <table className="w-full mt-5">
                          <thead>
                            <tr className="border-y-[2px] border-slate-300">
                              <th className="py-4 px-2 border-x-[2px]">
                                Pemilik
                              </th>
                              <th className="py-4 px-2 border-r-[2px]">Role</th>
                              <th className="py-4 px-2 border-r-[2px]">
                                Status
                              </th>
                              <th className="py-4 px-2 border-r-[2px]">Aksi</th>
                            </tr>
                          </thead>
                          {
                            userData?.role === "Admin" ?
                              users
                                .filter((user) => user.role.nama === "Kelurahan" || user.role.nama === "Admin")
                                .map((user: UserAccount) => (
                                  <tbody key={user.id}>
                                    <tr className="border-b-2 border-slate-300 text-center text-sm">
                                      <td className="py-4 px-2 border-x-[2px]">
                                        <div className="flex flex-col gap-2">
                                          <div className="flex flex-col gap-1 text-start">
                                            <span>{user.nama || "-"}</span>
                                            <span className="text-slate-400">
                                              {user.no_telp || "-"}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-2 border-r-[2px]">
                                        <div className="flex flex-col gap-1 text-start">
                                          <span>{user.role.nama || "-"}</span>
                                          {/* <span className="text-slate-400">
                                  {user.kelurahan.name || "-"}
                                </span> */}
                                        </div>
                                      </td>
                                      <td className="py-4 px-3 border-r-[2px] w-auto lg:max-w-[100px]">
                                        <div className="flex flex-col gap-2">
                                          {user.is_active == "1" ? (
                                            <button
                                              type="button"
                                              onClick={() => { }}
                                              className={`p-2 px-1 text-center text-xs rounded-full bg-green-200`}
                                            >
                                              <span
                                                className={`font-bold text-green-600`}
                                              >
                                                Aktif
                                              </span>
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() => { }}
                                              className={`min-w-[70px] p-2 px-1 text-center text-xs rounded-full bg-red-200`}
                                            >
                                              <span
                                                className={`font-bold text-red-600`}
                                              >
                                                Tidak Aktif
                                              </span>
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-4 px-3 border-r-[2px] whitespace-nowrap w-auto lg:max-w-[100px]">
                                        <div className="flex flex-col gap-2">
                                          <EditUserButton
                                            user={user}
                                            setRefetch={setRefetch}
                                            setCurUserAccount={setCurUserAccount}
                                            setIsModalActive={setIsModalActive}
                                          />
                                          <UpdatePasswordButton
                                            user={user}
                                            setRefetch={setRefetch}
                                            setCurUserAccount={setCurUserAccount}
                                            setIsModalActive={setIsModalUpdatePasswordActive}
                                          />
                                          {user.is_active == "1" ? (
                                            <NonAktifkanButton
                                              user={user}
                                              setRefetch={setRefetch}
                                            />
                                          ) : (
                                            <AktifkanButton
                                              user={user}
                                              setRefetch={setRefetch}
                                            />
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))
                              :
                              users
                                .filter((user) => (user.kelurahan?.id === userAccount?.kelurahan?.id && user.role.nama === "Satuan Tugas (Satgas)") || user.id === userData.id)
                                .map((user: UserAccount) => (
                                  <tbody key={user.id}>
                                    <tr className="border-b-2 border-slate-300 text-center text-sm">
                                      <td className="py-4 px-2 border-x-[2px]">
                                        <div className="flex flex-col gap-2">
                                          <div className="flex flex-col gap-1 text-start">
                                            <span>{user.nama || "-"}</span>
                                            <span className="text-slate-400">
                                              {user.no_telp || "-"}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-2 border-r-[2px]">
                                        <div className="flex flex-col gap-1 text-start">
                                          <span>{user.role.nama || "-"}</span>
                                          {/* <span className="text-slate-400">
                                      {user.kelurahan.name || "-"}
                                    </span> */}
                                        </div>
                                      </td>
                                      <td className="py-4 px-3 border-r-[2px] w-auto lg:max-w-[100px]">
                                        <div className="flex flex-col gap-2">
                                          {user.is_active == "1" ? (
                                            <button
                                              type="button"
                                              onClick={() => { }}
                                              className={`p-2 px-1 text-center text-xs rounded-full bg-green-200`}
                                            >
                                              <span
                                                className={`font-bold text-green-600`}
                                              >
                                                Aktif
                                              </span>
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() => { }}
                                              className={`min-w-[70px] p-2 px-1 text-center text-xs rounded-full bg-red-200`}
                                            >
                                              <span
                                                className={`font-bold text-red-600`}
                                              >
                                                Tidak Aktif
                                              </span>
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-4 px-3 border-r-[2px] whitespace-nowrap w-auto lg:max-w-[100px]">
                                        <div className="flex flex-col gap-2">
                                          {
                                            userData?.role === "Kelurahan" && user.id === userData?.id ?
                                              <>
                                                <UpdatePasswordButton
                                                  user={user}
                                                  setRefetch={setRefetch}
                                                  setCurUserAccount={setCurUserAccount}
                                                  setIsModalActive={setIsModalUpdatePasswordActive}
                                                />
                                              </>
                                              :
                                              <>
                                                <EditUserButton
                                                  user={user}
                                                  setRefetch={setRefetch}
                                                  setCurUserAccount={setCurUserAccount}
                                                  setIsModalActive={setIsModalActive}
                                                />
                                                <UpdatePasswordButton
                                                  user={user}
                                                  setRefetch={setRefetch}
                                                  setCurUserAccount={setCurUserAccount}
                                                  setIsModalActive={setIsModalUpdatePasswordActive}
                                                />
                                                {user.is_active == "1" ? (
                                                  <NonAktifkanButton
                                                    user={user}
                                                    setRefetch={setRefetch}
                                                  />
                                                ) : (
                                                  <AktifkanButton
                                                    user={user}
                                                    setRefetch={setRefetch}
                                                  />
                                                )}
                                              </>
                                          }
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))
                          }
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* </AutosaveFormEffect> */}
                </UserLoader>
              </KelurahanLoader>
            </KecamatanLoader>
          </RoleLoader>
        </AdminLayout>
      </UsersLoader>
      {isModalActive === true && curUserAccount != null && (
        <ModalTambahSatgas
          setIsModalActive={setIsModalActive}
          userAccount={curUserAccount}
          setRefetch={setRefetch}
        />
      )}
      {isModalUpdatePasswordActive === true && curUserAccount != null && (
        <ModalUpdatePassword
          setIsModalActive={setIsModalUpdatePasswordActive}
          userAccount={curUserAccount}
          setRefetch={setRefetch}
        />
      )}
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

export default TambahSatgasAdmin;
