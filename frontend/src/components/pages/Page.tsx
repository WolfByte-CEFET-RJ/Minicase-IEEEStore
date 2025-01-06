import { ReactNode } from "react"

interface PageProps {
    children?: ReactNode
}

export default function Page(props: PageProps) {
    return (
        <div className={`flex flex-col min-h-screen lg:px-0`}>
            <div className="layout-boxed">{props.children}</div>
        </div>
    )
}