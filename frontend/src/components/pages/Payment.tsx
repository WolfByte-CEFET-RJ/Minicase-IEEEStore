import Input from "../form/Input";
import InformationBox from "../layout/InformationBox";
import { RiUserLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { GoLink } from "react-icons/go";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";
import axios from "axios";


export default function Payment() {

    const [payment, setPayment] = useState({})

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPayment({...payment, [e.target.name]: e.target.value})
    }

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const url = 'http://localhost:8080/'
        try {
            const response = await axios.patch(url, payment)
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <InformationBox className="border-4 border-gray-400 w-fit p-10 m-auto">
            <h1 className="font-bold text-4xl text-center mb-5">Dados de Pagamento</h1>
            <form onSubmit={submit}>
                <Input type="text"
                    name="nome_destinatario" 
                    size={30} 
                    icon={<RiUserLine size={30} />} 
                    placeholder="Nome do destinatário pix" 
                    className="bg-white"
                    onChange={handleOnChange}
                />
                <Input
                    type="text" 
                    name="chave_pix" 
                    size={30} 
                    icon={<RiKey2Fill size={30} />} 
                    placeholder="Chave-pix" 
                    className="bg-white"
                    onChange={handleOnChange}
                />
                <Input 
                    type="text" 
                    name="link_checkout" 
                    size={30} 
                    icon={<GoLink size={30} />} 
                    placeholder="Link para check-out" 
                    className="bg-white"
                    onChange={handleOnChange}
                />
                <div className="flex gap-3 mt-7">
                    <SubmitButton text="Salvar" className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 w-full text-2xl" />
                </div>
            </form>
        </InformationBox>
    )
}