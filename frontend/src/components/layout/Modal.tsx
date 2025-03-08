import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
    children: ReactNode,
    className?: string
}
export default function Modal(props: ModalProps) {
    if(!props.isOpen) {
        return null
    }
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-1 flex items-center justify-center" onClick={() => props.setIsOpen(false)}>
            <div className={`bg-white rounded-xl ${props.className}`} >
                {props.children}
            </div>
        </div>
    );
}
