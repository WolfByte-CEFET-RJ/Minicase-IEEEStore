import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { MdAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link } from "react-router";

export default function Login() {
    return (
        <InformationBox className="w-fit m-auto">
            <h1 className="font-bold text-4xl text-center">Insira seu login</h1>
            <p className="text-center">Não tem conta? <Link to="/signup" className="text-gray-600 hover:text-gray-900 font-semibold">Cadastre-se</Link></p>
            <form className="flex flex-col px-10 py-5 gap-8">
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    name="email"
                    size={40}
                    icon={<MdAlternateEmail size={30} />}
                />
                <Input
                    type="password"
                    placeholder="Crie uma senha"
                    name="senha"
                    size={40}
                    icon={<TbLock size={30} />}
                />
                <div className="flex justify-between items-center">
                    <Input
                        type="checkbox"
                        name="conectado"
                        size={40}
                        checkbox="Manter conectado"
                    />
                    <a href="#" className="text-gray-600 hover:text-gray-900 font-semibold">Esqueci minha senha</a>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <SubmitButton text="Entrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3" />
                </div>
            </form>
        </InformationBox>
    )
}