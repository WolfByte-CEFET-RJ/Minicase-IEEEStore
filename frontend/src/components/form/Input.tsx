import { ReactNode } from "react"
import { useEffect, useState } from "react"

interface InputProps {
    type: string
    name: string
    placeholder?: string
    icon?: ReactNode
    size: number
    checkbox?: string
}


export default function Input(props: InputProps) {

    const [inputSize, setInputSize] = useState(props.size)

    useEffect(()=> {

        const handleSize = () => {
            if(window.innerWidth < 640) {
                setInputSize(props.size/2)
            } else if(window.innerWidth < 1024) {
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
                        placeholder={props.placeholder}
                        className="focus:outline-none bg-amber-50 text-xl placeholder-gray-600"
                        size={inputSize}
                        autoComplete="off"
                    />
                    <label htmlFor={props.name}>{props.icon}</label>
                </div>
            ) : (
                <div className="flex p-1 ">
                    <p className="text-xl mr-5">{props.checkbox}</p>
                    <input
                        type={props.type}
                        name={props.name}
                        className="w-4"
                        size={inputSize}
                        autoComplete="off"
                    />
                    <label htmlFor={props.name}>{props.icon}</label>
                </div>
            )}
        </>
    )
}