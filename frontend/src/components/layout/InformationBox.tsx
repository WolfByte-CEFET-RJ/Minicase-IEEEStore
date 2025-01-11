import { ReactNode } from "react"

interface InformationBoxProps {
    children: ReactNode
}

export default function InformationBox(props: InformationBoxProps) {
    return (
        <section className="layout-boxed mt-20 bg-amber-50 rounded-3xl flex flex-col gap-6 py-10">
            {props.children}
        </section>
    )
}