import { ReactNode } from "react"

interface InformationBoxProps {
    children: ReactNode
    className?: string
}

export default function InformationBox(props: InformationBoxProps) {
    return (
        <section className={`mt-20 bg-amber-50 rounded-3xl flex flex-col gap-6 py-10 ${props.className ? props.className : 'layout-boxed'}`}>
            {props.children}
        </section>
    )
}