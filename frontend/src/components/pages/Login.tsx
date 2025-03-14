import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { MdAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useUserContext from "../../hooks/useUseContext";


export default function Login() {

    const navigate = useNavigate()
    const [login, setLogin] = useState({})
    let stayConnected = false
    const url = 'http://localhost:8080/login'

    const [msg, setMsg] = useState<string>('')
    const {setIsAdm, setUserId} = useUserContext()
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.name === 'conectado') {
            stayConnected = e.target.checked
        } else {
            setLogin({...login, [e.target.name]: e.target.value})
        }
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        localStorage.removeItem('token')
        sessionStorage.removeItem('token')

        axios.post(url, login)
        .then((res) => res.data)
        .then((data) => {
            if(data.status && stayConnected) {
                localStorage.setItem('token', data.message.token)
                navigate('/')
            } else if(data.status && !stayConnected) {
                sessionStorage.setItem('token', data.message.token)
                navigate('/')
            }
            let token = data.message?.token
            if (token) {
                let decodedToken:{id:number, role?:string, iat:number, exp:number} = jwtDecode(token)
                setUserId(decodedToken.id)
                if(decodedToken?.role === 'admin') {
                    setIsAdm(true)
                }
            }
            setMsg(data.message?.message || data.message)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <InformationBox className="w-fit m-auto bg-amber-50">
            <h1 className="font-bold text-4xl text-center">Insira seu login</h1>
            <p className="text-center">Não tem conta? <Link to="/signup" className="text-gray-600 hover:text-gray-900 font-semibold">Cadastre-se</Link></p>
            <p className="text-center text-red-600 font-semibold">{msg}</p>
            <form className="flex flex-col px-10 py-5" onSubmit={submit}>
                <Input
                    type="text"
                    placeholder="Digite seu cpf"
                    name="cpf"
                    size={40}
                    icon={<MdAlternateEmail size={30} />}
                    onChange={handleOnChange}
                />
                <Input
                    type="password"
                    placeholder="Crie uma senha"
                    name="senha"
                    size={40}
                    icon={<TbLock size={30} />}
                    onChange={handleOnChange}
                />
                <div className="flex justify-between items-center">
                    <Input
                        type="checkbox"
                        name="conectado"
                        size={40}
                        checkbox="Manter conectado"
                        onChange={handleOnChange}
                    />
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Esqueci minha senha</a>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <SubmitButton text="Entrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3 text-2xl mt-5" />
                </div>
            </form>
        </InformationBox>
    )
}