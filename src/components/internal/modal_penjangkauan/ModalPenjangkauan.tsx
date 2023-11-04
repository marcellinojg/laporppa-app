import { Dispatch, SetStateAction, useRef } from "react"
import useOutsideAlerter from "../../../hooks/useOutsideAlerter"
import FormDetailKlien from "./klien/FormDetailKlien"
import DetailKlienContent from "./klien/DetailKlienContent"
import DetailSituasiContent from "./situasi/DetailSituasiContent"
import FormDetailSituasi from "./situasi/FormDetailSituasi"
import DetailKronologiContent from "./kronologi/KronologiContent"
import FormDetailKronologi from "./kronologi/FormKronologi"


interface ModalPenjangkauanProps {
    mode: 'read' | 'edit' | 'input'
    setIsModalActive: Dispatch<SetStateAction<boolean>>
}

export const KlienModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 max-h-[90vh] overflow-auto rounded-md">
                {mode === 'read' ? <DetailKlienContent /> : <FormDetailKlien mode={mode} />}
            </div>
        </div>
    </>
}


export const KeluargaModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                This is Modal {mode} Keluraga
            </div>
        </div>
    </>
}

export const SituasiModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                {mode === 'read' ? <DetailSituasiContent /> : <FormDetailSituasi mode={mode} />}
            </div>
        </div>
    </>
}

export const KronologiModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                {mode === 'read' ? <DetailKronologiContent /> : <FormDetailKronologi mode={mode} />}
            </div>
        </div>
    </>
}

export const HarapanModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    console.log(mode)
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                This is Modal {mode} Harapan
            </div>
        </div>
    </>
}

export const KondisiModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    console.log(mode)
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                This is Modal {mode} Kondisi
            </div>
        </div>
    </>
}

export const LangkahDilakukanModal = (props: ModalPenjangkauanProps) => {
    const { mode, setIsModalActive } = props
    console.log(mode)
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef, () => setIsModalActive(false))
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-20 flex items-center justify-center">
            <div ref={modalRef} className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-3/4 md:w-1/2 w-11/12 rounded-md">
                This is Modal {mode} Langkah Dilakukan
            </div>
        </div>
    </>
}