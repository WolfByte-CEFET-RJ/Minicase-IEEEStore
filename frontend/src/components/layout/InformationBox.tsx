import { ReactNode } from "react"

interface InformationBoxProps {
    children: ReactNode
}

export default function InformationBox(props: InformationBoxProps) {
    return (
        <section className="layout-boxed bg-amber-50 rounded flex flex-col gap-4 py-10">
            {props.children}
        </section>
    )
}