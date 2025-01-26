import InformationBox from "../layout/InformationBox"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton";
import Select from "../form/Select";
import { RiIdCardLine } from "react-icons/ri";
import { Bs123 } from "react-icons/bs";
import { MdOutlineLocalPhone, MdAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function Signup() {

    const[formData, setFormData] = useState({
        nome: " ",
        CPF: " ", 
        telefone: " ", 
        email: " ", 
        senha: " ", 
        equipe: " ", 
        cargo: " ", 
        pagante: false, 
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(" ")
    const [success, setSuccess] = useState(false);

    const handleFormEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData)
    };

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        try{ //Tem que confirmar qual a URL e o endpoint usado pelo backend
            //const response = await axios.post("http://localhost:3000/cadastro",formData)
            //console.log("Resposta do servidor:", response.data);
            setSuccess(true)
        }catch(error){
            console.error("Erro ao enviar o formulário:", error)
            setError("Ocorreu um erro ao enviar os dados. Tente novamente.")
        }finally{
            setLoading(!loading)
        }

    }

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
            <h1 className="font-bold text-4xl text-center">Crie seu cadastro</h1>
            <form className="flex flex-col px-10 py-5" onSubmit={handleForm}>
                <div className="flex flex-row flex-wrap px-10 py-5 justify-around">
                    <div className="flex flex-col gap-8">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            size={40}
                            icon={<RiIdCardLine size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu CPF"
                            name="CPF"
                            size={40}
                            icon={<Bs123 size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu telefone"
                            name="telefone"
                            size={40}
                            icon={<MdOutlineLocalPhone size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="email"
                            placeholder="Digite seu email"
                            name="email"
                            size={40}
                            icon={<MdAlternateEmail size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="password"
                            placeholder="Crie uma senha"
                            name="senha"
                            size={40}
                            icon={<TbLock size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl">Você é membro do IEEE?</h2>
                        <div className="flex flex-wrap">    
                            <Select 
                                group_options={team}
                                text="equipe"
                                onChange={(e) => handleFormEdit(e)} 
                            />
                            
                            <Select
                                options={['Lider', 'Membro']}
                                text="cargo"
                                onChange={(e) => handleFormEdit(e)} 
                            />
                        </div>
                        <div className="flex flex-wrap">    
                            <Select 
                                group_options={team}
                                text="equipe"
                                onChange={(e) => handleFormEdit(e)} 
                            />
                            
                            <Select
                                options={['Lider', 'Membro']}
                                text="cargo"
                                onChange={(e) => handleFormEdit(e)}
                            />
                        </div>
                        <div className="flex flex-wrap">    
                            <Select 
                                group_options={team}
                                text="equipe" 
                                onChange={(e) => handleFormEdit(e)}
                            />
                            
                            <Select
                                options={['Lider', 'Membro']}
                                text="cargo"
                                onChange={(e) => handleFormEdit(e)}
                            />
                        </div>

                        <Input
                            type="checkbox"
                            name="pagante"
                            size={40}
                            checkbox="Você é membro pagante da IEEE?"
                            checked={formData.pagante}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    pagante: e.target.checked,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <SubmitButton 
                        text={loading ? "...Cadastrando" : "Cadastrar"}
                        className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3"
                        disable={loading} 
                    />
                </div>
                {success && <p className="text-black text-xl text-center mt-3">Cadastro realizado com sucesso!</p>}
                {error && <p className="text-black text-xl text-center mt-3">{error}</p>}
            </form>
        </InformationBox>
    )
}