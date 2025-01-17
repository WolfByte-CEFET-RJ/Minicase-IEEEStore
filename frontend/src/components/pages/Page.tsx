import { ReactNode } from "react"
import { useLocation } from "react-router";

interface PageProps {
    children?: ReactNode
}

export default function Page(props: PageProps) {
    const location = useLocation()
    
    console.log(location)

    let backgroundColor = 'bg-white'

    if(location.pathname === '/signup' || location.pathname === '/login') {
        backgroundColor = "bg-[#0D5FAA]"
    }

    return (
        <div className={`flex flex-col min-h-screen lg:px-0 ${backgroundColor}`}>
            <div className="layout-boxed">{props.children}</div>
        </div>
    )
}