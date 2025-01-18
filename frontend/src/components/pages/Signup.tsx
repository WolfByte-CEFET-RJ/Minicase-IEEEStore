import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton";
import { RiIdCardLine } from "react-icons/ri";
import { Bs123 } from "react-icons/bs";
import { MdOutlineLocalPhone, MdAlternateEmail, MdWorkOutline, MdDiversity2 } from "react-icons/md";
import { TbLock } from "react-icons/tb";


export default function Signup() {
    return (
        <InformationBox>
            <h1 className="font-bold text-4xl text-center">Crie seu cadastro</h1>
            <form className="flex flex-col px-10 py-5">
                <div className="flex flex-row flex-wrap px-10 py-5 justify-around">
                    <div className="flex flex-col gap-8">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            size={40}
                            icon={<RiIdCardLine size={30} />}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu CPF"
                            name="CPF"
                            size={40}
                            icon={<Bs123 size={30} />}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu telefone"
                            name="telefone"
                            size={40}
                            icon={<MdOutlineLocalPhone size={30} />}
                        />
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
                    </div>
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl">Você é membro do IEEE?</h2>

                        <Input
                            type="text"
                            placeholder="Digite sua equipe"
                            name="equipe"
                            size={40}
                            icon={<MdDiversity2 size={30} />}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu cargo"
                            name="cargo"
                            size={40}
                            icon={<MdWorkOutline size={30} />}
                        />
                        <Input
                            type="checkbox"
                            name="pagante"
                            size={40}
                            checkbox="Você é membro pagante da IEEE?"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <SubmitButton text="Cadastrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3" />
                </div>
            </form>
        </InformationBox>
    )
}