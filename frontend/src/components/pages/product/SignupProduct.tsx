import Input from "../../form/Input";
import InformationBox from "../../layout/InformationBox";
import { IoShirtOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { PiChartLineUp } from "react-icons/pi";
import SubmitButton from "../../form/SubmitButton";
import { useNavigate } from "react-router";
import React, { FormEvent, useState } from "react";
import axios from "axios";


export default function SignupProduct() {
    const navigate  = useNavigate()
    const url = 'http://localhost:8080/produto'
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')
    const [msg, setMsg] = useState('')
    let color = ''
    msg === 'Produto criado com sucesso.' ? color = 'text-green-600' : color = 'text-red-600'

    const [product, setProduct] = useState({})

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        if(name === "preco" || name === "quantidade") {
            setProduct({...product, [name]: Number(value)})
        } else {
            setProduct({...product, [name]: value})
        }
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await axios.post(url, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setMsg(response.data.message)
            console.log(response)
        } catch (error) {
            if(axios.isAxiosError(error)) {
                setMsg(error?.response?.data?.message)
            }
        }

    }

    return (
        <InformationBox className="border-4 border-gray-400 w-fit p-10 m-auto">
            <p className={`text-center ${color} font-semibold`}>{msg}</p>
            <h1 className="font-bold text-4xl text-center mb-5">Cadastro de produto</h1>
            <form onSubmit={submit}>
                <Input
                    type="text" 
                    name="nome" 
                    size={30} 
                    icon={<IoShirtOutline size={30} />} 
                    placeholder="Digite o nome" 
                    className="bg-white" 
                    onChange={handleOnChange} 
                />
                <Input 
                    type="number" 
                    name="quantidade" 
                    size={30} 
                    icon={<PiChartLineUp size={30} />} 
                    placeholder="Quantidade disponível" 
                    className="bg-white" 
                    onChange={handleOnChange} 
                />
                <Input 
                    type="number" 
                    name="preco" 
                    size={30} 
                    icon={<HiOutlineCurrencyDollar size={30} />} 
                    placeholder="Digite o preço" 
                    className="bg-white"
                    onChange={handleOnChange}
                 />
                <Input 
                    type="text" 
                    name="foto" 
                    size={30} 
                    placeholder="Imagem do produto" 
                    className="bg-white"
                    onChange={handleOnChange}
                />
                <div className="flex gap-3 mt-7">
                    <SubmitButton text="Cadastrar produto" className="text-xl bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 " />
                    <button className="bg-blue-800 hover:bg-blue-950 text-white font-bold px-8 py-2 rounded-xl text-xl" onClick={() => navigate('/paymant-details')}>Detalhes pagamento</button>
                </div>
            </form>
        </InformationBox>
    )
}