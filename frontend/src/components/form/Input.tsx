import { ReactNode } from "react"
import { useEffect, useState } from "react"

interface InputProps {
    type: string
    name: string
    value?: string
    placeholder?: string
    icon?: ReactNode
    size: number
    checkbox?: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function Input(props: InputProps) {

    const [inputSize, setInputSize] = useState(props.size)
    
    useEffect(()=> {

        const handleSize = () => {
            if(window.innerWidth < 640) {
                setInputSize(props.size/2)
            } else {
                setInputSize(props.size)
            }
        }

        handleSize()

        window.addEventListener("resize", handleSize)

        return () => {
            window.removeEventListener("resize", handleSize);
        }
    }, [])
    
    return ( 


        <>
            {props.type !== 'checkbox' ? (
                <div className="flex justify-between border-b border-gray-500 p-1">
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.name}
                        placeholder={props.placeholder}
                        className="focus:outline-none bg-amber-50 text-xl placeholder-gray-600"
                        size={inputSize}
                        autoComplete="off"
                        onChange={props.onChange}
                    />
                    <label htmlFor={props.name}>{props.icon}</label>
                </div>
            ) : (
                <div className="flex p-1 ">
                    <label htmlFor={props.name} className="text-xl mr-5">{props.checkbox}</label>
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.name}
                        className="w-4"
                        size={inputSize}
                        autoComplete="off"
                        onChange={props.onChange}
                    />
                </div>
            )}
        </>
    )
}