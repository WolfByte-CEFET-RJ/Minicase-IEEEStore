import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { MdAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import Logo from "../layout/Logo";

export default function Login() {
    return (
    <>
      <Logo />
        
        <InformationBox className="w-fit m-auto">
            <h1 className="font-bold text-4xl text-center">Insira seu login</h1>
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
                <div className="flex justify-between">
                    <Input
                        type="checkbox"
                        name="conectado"
                        size={40}
                        checkbox="Manter conectado"
                    />
                    <a href="#" className="italic underline text-blue-500">Esqueci minha senha</a>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <SubmitButton text="Entrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3" />
                </div>
            </form>
        </InformationBox>
    </>
    )
}