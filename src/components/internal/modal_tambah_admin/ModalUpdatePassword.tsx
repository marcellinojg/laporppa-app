import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import { UserAccount } from "../../../consts/user";
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
import { KecamatanLoader, KelurahanLoader, RoleLoader } from "../../../helpers/fetchHelpers";
import { REGEX } from "../../../consts/regex";

interface ModalUpdatePasswordProps {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  userAccount: UserAccount;
  setRefetch?: Dispatch<SetStateAction<boolean>>;
}

interface UserAccountUpdatePassword {
  // id: string,
  password?: string,
}

const ModalUpdatePassword = (props: ModalUpdatePasswordProps) => {
  const { setIsModalActive, userAccount, setRefetch } = props;
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => setIsModalActive(false));
  const [isWrong, setIsWrong] = useState<boolean>(false);
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

  const onSubmit: SubmitHandler<UserAccountUpdatePassword> = async (data: UserAccountUpdatePassword) => {
    if (data?.password != data?.password_confirm) {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 5000)
      // addAlert(
      //   {
      //     type: ALERT_TYPE.WARNING,
      //     title: 'Password Tidak Sesuai !',
      //     message: 'Pastikan konfirmasi password sesuai !'
      //   }
      // )
    }
    else {
      const formatData: UserAccountUpdatePassword = {
        ...data,
      };

      try {
        setIsLoading(true);
        showLoader();
        (await patchUser(formatData, userAccount.id));
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Password Berhasil Diupdate !",
          message: `Password ${userAccount.nama} berhasil diupdate !`,
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
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
        <div
          ref={modalRef}
          className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 max-h-[90vh] overflow-auto rounded-md"
        >
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
                    {isWrong && (
                      <span className='text-red-500'> Password Tidak Sesuai</span>
                    )}
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
                    Update Password Satgas / Admin Kelurahan
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
          {/* </div> */}
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

export default ModalUpdatePassword;