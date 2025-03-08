import { ReactNode } from "react";

interface UserProviderProps {
    children: ReactNode;
}

export default function Modal({children}: UserProviderProps) {
    return (
        <div className="">
            {children}
        </div>
    )
}