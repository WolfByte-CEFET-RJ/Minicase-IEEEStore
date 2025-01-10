import { ReactNode } from "react"

interface InputProps {
    type: string
    name: string
    placeholder: string
    icon: ReactNode
    size: number
}


export default function Input(props: InputProps) {
    return (
        <div className=" flex justify-between border-b border-gray-500 p-1">
            <input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                className="focus:outline-none bg-amber-50 text-xl placeholder-gray-600"
                size={props.size}
                autoComplete="off"
            />
            <label htmlFor={props.name}>{props.icon}</label>
        </div>
    )
}