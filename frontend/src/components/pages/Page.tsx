import { ReactNode } from "react"
import { useLocation } from "react-router";

interface PageProps {
    children?: ReactNode
}

export default function Page(props: PageProps) {
    const location = useLocation()

    let backgroundColor = 'bg-white'

    if(location.pathname === '/signup' || location.pathname === '/login') {
        backgroundColor = "bg-[#0D5FAA]"
    }

    return (
        <main className={`flex flex-col flex-1 lg:px-0 ${backgroundColor}`}>
            <div className="layout-boxed">{props.children}</div>
        </main>
    )
}