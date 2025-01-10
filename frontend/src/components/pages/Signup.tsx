import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import { RiIdCardLine } from "react-icons/ri";

export default function Signup() {
    return (
        <div className="absolute left-0 top-0 bg-blue-700 w-full h-full">
            <InformationBox>
                <h1 className="font-bold text-4xl text-center">Crie seu cadastro</h1>
                <form className="flex flex-row flex-wrap px-10 py-5">
                    <div className="flex flex-col gap-8">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            size={40}
                            icon={<RiIdCardLine size={30}/>}
                        />

                        <Input
                            type="text"
                            placeholder="Digite seu CPF"
                            name="cpf"
                            size={40}
                            icon={<RiIdCardLine size={30}/>}
                        />
                    </div>
                </form>
            </InformationBox>
        </div>
    )
}