import axios from "axios"
import { useEffect, useState } from "react"
import InformationBox from "../layout/InformationBox"
import SubmitButton from "../form/SubmitButton"

interface PaymentDetails {
    chave_pix: string,
    link_checkout: string,
    nome_destinatario: string
}

export default function PaymentDetails() {

    const [paymentDateails, setPaymentDetails] = useState<PaymentDetails>({
        chave_pix: "",
        link_checkout: "",
        nome_destinatario: ""
    })

    useEffect(() => {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
        const url = 'http://localhost:8080/metodo_pagamento/view'
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setPaymentDetails(res.data?.message))
        .catch((error) => console.log(error))
    }, [paymentDateails])
    return (
        <div className="w-fit m-auto">
            <h1 className="font-bold text-4xl pt-10 pb-2">Pagamento do pedido</h1>
            <InformationBox className="border-4 border-gray-400 w-fit p-10">
                <h2 className="text-xl font-semibold before:content-['.'] before:mr-1 before:text-4xl">Pix</h2>
                <p>Para o pagamento do seu pedido com pix use a <span className="font-semibold">chave-pix</span>: {paymentDateails.chave_pix} </p>
                <h2 className="text-xl font-semibold before:content-['.'] before:mr-1 before:text-4xl">Cartão</h2>
                <p>Link para <span className="font-semibold">check-out</span>: {paymentDateails.link_checkout} </p>
                <p>Após efetuar o pagamento do pedido anexe o comprovante e depois clique em enviar.</p>
                <form className="flex gap-3">
                    <label htmlFor="file-upload" className="bg-blue-800 hover:bg-blue-950 text-white font-bold px-8 py-2 rounded-xl text-xl cursor-pointer">Anexar comprovante</label>
                    <input id="file-upload" type="file" className="hidden" />
                    <SubmitButton text="Enviar" className="text-xl bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 " />
                </form>
            </InformationBox>
        </div>
    )
}