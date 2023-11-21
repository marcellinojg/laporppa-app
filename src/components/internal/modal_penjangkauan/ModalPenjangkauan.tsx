import { Dispatch, SetStateAction, useRef } from "react"
import useOutsideAlerter from "../../../hooks/useOutsideAlerter"
import modalPenjangkauanMapper from "../../../helpers/modalPenjangkauanMapper"
import { Laporan } from "../../../consts/laporan"


interface ModalPenjangkauanProps {
    mode: 'read' | 'edit' | 'input'
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    modalType: string
    laporan : Laporan
    setRefetch?: Dispatch<SetStateAction<boolean>>
}

const ModalPenjangkauan = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive, modalType, laporan, setRefetch } = props
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    const mappedModal = modalPenjangkauanMapper(modalType)
    const Content = mappedModal[0]
    const Form = mappedModal[1]
    return (
      <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
          <div
            ref={modalRef}
            className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 max-h-[90vh] overflow-auto rounded-md"
          >
            {mode === "read" ? (
              <Content
                mode={"read"}
                setIsModalActive={setIsModalActive}
                laporan={laporan}
                setRefetch={setRefetch}
              />
            ) : (
              <Form
                mode={mode}
                setIsModalActive={setIsModalActive}
                laporan={laporan}
                setRefetch={setRefetch}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ModalPenjangkauan
