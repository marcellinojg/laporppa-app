import { ReactNode } from "react"


interface InputSectionProps {
    title?: string,
    children: ReactNode
}

export const InputSection = (props: InputSectionProps) => {
    const { title, children } = props
    return <section className="border-b-[1px] border-slate-400 py-5">
        {title && <h2 className="font-bold mb-3 text-lg text-primary">{title}</h2>}
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </section>
}