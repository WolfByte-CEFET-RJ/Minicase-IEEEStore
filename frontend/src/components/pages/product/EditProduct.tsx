import Input from "../../form/Input";
import InformationBox from "../../layout/InformationBox";
import { AiOutlineEdit } from "react-icons/ai";
import SubmitButton from "../../form/SubmitButton";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { FormEvent, useState } from "react";
import axios from "axios";


export default function EditProduct() {
    const navigate  = useNavigate()
    const [updateProduct, setUpdateProduct] = useState({})
    const {id} = useParams()
    const url = `http://localhost:8080/produto/${id}`
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')
    const [msg, setMsg] = useState<string>('')

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        if(name === "preco" || name === "quantidade") {
            setUpdateProduct({...updateProduct, [name]: Number(value)})
        } else {
            setUpdateProduct({...updateProduct, [name]: value})
        }
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await axios.patch(url, updateProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            setMsg(response.data?.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <InformationBox className="border-4 border-gray-400 w-fit p-10 m-auto">
            <h1 className="font-bold text-4xl text-center mb-5">Editar de produto</h1>
            <p className={`text-center font-semibold ${msg==='Produto atualizado com sucesso.' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>
            <form onSubmit={submit}>
                <Input 
                    type="text" 
                    name="nome" 
                    size={30} 
                    icon={<AiOutlineEdit size={30} />} 
                    placeholder="Digite o nome" 
                    className="bg-white"
                    onChange={handleOnChange} 
                />
                <Input 
                    type="number" 
                    name="quantidade" 
                    size={30} 
                    icon={<AiOutlineEdit size={30} />} 
                    placeholder="Quantidade disponível" 
                    className="bg-white"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number" 
                    name="preco" 
                    size={30} 
                    icon={<AiOutlineEdit size={30} />} 
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
                    <SubmitButton text="Salvar alterações" className="text-xl bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 " />
                    <button className="bg-blue-800 hover:bg-blue-950 text-white font-bold px-8 py-2 rounded-xl text-xl" onClick={() => navigate('/paymant-details')}>Detalhes pagamento</button>
                </div>
            </form>
        </InformationBox>
    )
}