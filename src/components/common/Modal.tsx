import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../form/Button"
import { FaPaperPlane, FaTimesCircle } from "react-icons/fa"
import { SatgasPelapor } from "../../consts/satgas"
import ReactSelect from "react-select"
import { ROLE } from "../../consts/role"
import { SatgasPelaporLoader } from "../../helpers/fetchHelpers"
import { useAuthUser } from "react-auth-kit"
import { User } from "../../consts/user"
import { Laporan } from "../../consts/laporan"

interface ModalProps {
  onClose: MouseEventHandler
  onSuccess: MouseEventHandler
  title?: string
  description?: string
  successButtonText: string
}

interface AssignModalProps extends ModalProps {
  setSelectedSatgasId: Dispatch<SetStateAction<string>>
  laporan: Laporan
}

export const ConfirmationModal = (props: ModalProps) => {
  const { onClose, onSuccess, title, description, successButtonText } = props
  return (
    <>
      <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
        <div className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-[600px] md:w-1/2 w-11/12 rounded-md">
          <span className="font-bold text-lg">{title}</span>
          <p className="mt-3 break-words overflow-hidden text-ellipsis">
            {description}
          </p>
          <div className="w-full flex gap-4 mt-7">
            <SecondaryButton
              className="flex items-center justify-center grow gap-2 py-2.5 hover:text-white"
              onClick={onClose}
            >
              <FaTimesCircle />
              Batal
            </SecondaryButton>
            <PrimaryButton
              className="flex items-center justify-center grow gap-2 py-2.5"
              onClick={onSuccess}
            >
              <FaPaperPlane />
              {successButtonText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export const AssignModal = (props: AssignModalProps) => {
  const { onClose, onSuccess, title, description, successButtonText, setSelectedSatgasId, laporan } = props
  const [satgasPelapors, setSatgasPelapors] = useState<SatgasPelapor[]>([])
  const userData = useAuthUser()() as User
  // console.log(userData)
  const customHeight = {
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "200px", // Adjust this value based on the height of your options
      overflowY: "auto",
    }),
  };


  return <>
    <SatgasPelaporLoader data={satgasPelapors} setData={setSatgasPelapors}>
      <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
        <div className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-[600px] md:w-1/2 w-11/12 rounded-md">
          <span className="font-bold text-lg">{title}</span>
          <p className="mt-3 text-center">Anda akan menerima laporan dari {description}.<br />Mohon pilih satgas yang akan menangani kasus ini.</p>
          <ReactSelect
            className="mt-4"
            onChange={(v) => setSelectedSatgasId(v?.value!)}
            options={satgasPelapors.filter((satgas) => satgas.role.nama === ROLE.SATGAS && satgas.kelurahan.id === laporan.kelurahan.id).map((satgas) => ({
              label: satgas.nama,
              value: satgas.id
            }))}
            styles={customHeight}
          />
          <div className="w-full flex gap-4 mt-7">
            <SecondaryButton
              className="flex items-center justify-center grow gap-2 py-2.5 hover:text-white"
              onClick={onClose}
            >
              <FaTimesCircle />
              Batal
            </SecondaryButton>
            <PrimaryButton
              className="flex items-center justify-center grow gap-2 py-2.5"
              onClick={onSuccess}
            >
              <FaPaperPlane />
              {successButtonText}
            </PrimaryButton>
          </div>
        </div>

      </div>
    </SatgasPelaporLoader>

  </>
}