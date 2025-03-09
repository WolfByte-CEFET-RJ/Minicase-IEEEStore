import { ReactNode, useEffect } from "react";

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
    children: ReactNode,
    className?: string
    msg?: string
    setMsg?: (msg: string) => void
}
export default function Modal(props: ModalProps) {
    useEffect(() => {
        if (props.msg && props.setMsg) {
            const timer = setTimeout(() => {
                if(props.setMsg) {
                    props.setMsg("");
                    props.setIsOpen(false)
                }
            }, 3000);

            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
        }
    }, [props.msg, props.setMsg]);

    if(!props.isOpen) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-1 flex items-center justify-center" >
            <div className={`bg-white rounded-xl ${props.className}`}>
                <>
                    {props.msg === '' ? props.children : (
                        <p className="text-lg font-semibold text-green-700">{props.msg}</p>
                    )}
                </>
            </div>
        </div>
    );
}
