import InformationBox from "../layout/InformationBox";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Select from "../form/Select";
import { RiIdCardLine } from "react-icons/ri";
import { Bs123 } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbLock } from "react-icons/tb";

export default function SignupAdm() {

    const team = {
        'Gestão': ['Gestão de Projetos', 'Gestão de Pessoas', 'Gestão de Processos', 'Gestão financeira'],
        'Marketing': ['Marketing'],
        'RocketWolf': ['Aerodinâmica', 'Estruturas', 'Recuperação', 'Eletrônica', 'Propulsão'],
        'WolfPower': ['Eletrônica/Programação', 'Mecânica', 'Divulgação'],
        'WolfBotz': ['Seguidor de Linha', 'Mini Sumô', 'Combate'],
        'SocialWolf': ['Mecânica', 'Programação', 'Eletrônica', 'Educacional'],
        'WolfByte': ['Inteligência Artificial (IA)', 'Web/App', 'Hardware', 'Games']
    }

    return (
        <InformationBox>
            <h1 className="font-bold text-4xl text-center">Cadastro de Administrador</h1>
                        <form className="flex flex-col px-10 py-5">
                            <div className="flex flex-row flex-wrap px-10 py-5 justify-around">
                                <div className="flex flex-col gap-8">
                                    <Input
                                        type="text"
                                        placeholder="Digite o nome"
                                        name="nome"
                                        size={40}
                                        icon={<RiIdCardLine size={30} />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Digite o CPF"
                                        name="CPF"
                                        size={40}
                                        icon={<Bs123 size={30} />}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Crie uma senha"
                                        name="senha"
                                        size={40}
                                        icon={<TbLock size={30} />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Digite o telefone"
                                        name="telefone"
                                        size={40}
                                        icon={<MdOutlineLocalPhone size={30} />}
                                    />
                                </div>
                                <div className="flex flex-col gap-8">
                                    <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl"> Equipes do IEEE</h2>
                                    <div className="flex flex-wrap">    
                                        <Select 
                                            group_options={team}
                                            text="equipe" />
                                        
                                        <Select
                                            options={['Lider', 'Membro']}
                                            text="cargo"
                                        />
                                    </div>
                                    <div className="flex flex-wrap">    
                                        <Select 
                                            group_options={team}
                                            text="equipe" />
                                        
                                        <Select
                                            options={['Lider', 'Membro']}
                                            text="cargo"
                                        />
                                    </div>
                                    <div className="flex flex-wrap">    
                                        <Select 
                                            group_options={team}
                                            text="equipe" />
                                        
                                        <Select
                                            options={['Lider', 'Membro']}
                                            text="cargo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-5">
                                <SubmitButton text="Cadastrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3" />
                            </div>
                        </form>
        </InformationBox>
    )
}