import InformationBox from "../layout/InformationBox";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Select from "../form/Select";
import { RiIdCardLine } from "react-icons/ri";
import { Bs123 } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignupAdm() {
    
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')
    const [msg, setMsg] = useState('')
    let color = ''
    msg === 'Administrador cadastrado com sucesso!' ? color = 'text-green-600' : color = 'text-red-600'
    
    useEffect(()=> {
        // Defina o token (pode ser pego do localStorage, state, etc.)
        if(token === null) {
            navigate('/login')
        }
    }, [])
    
    const [signupAdm, setSignupAdm] = useState({})
    const selectNumberTeams = 3
    const [teams, setTeams] = useState<string[]>(Array(selectNumberTeams).fill(" - "))
    
    const team = {
        'Gestão': ['Gestão de Projetos', 'Gestão de Pessoas', 'Gestão de Processos', 'Gestão financeira'],
        'Marketing': ['Marketing'],
        'RocketWolf': ['Aerodinâmica', 'Estruturas', 'Recuperação', 'Eletrônica', 'Propulsão'],
        'WolfPower': ['Eletrônica/Programação', 'Mecânica', 'Divulgação'],
        'WolfBotz': ['Seguidor de Linha', 'Mini Sumô', 'Combate'],
        'SocialWolf': ['Mecânica', 'Programação', 'Eletrônica', 'Educacional'],
        'WolfByte': ['Inteligência Artificial (IA)', 'Web/App', 'Hardware', 'Games']
    }
    
    function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const {name, value} = e.target
        setSignupAdm({...signupAdm, [name]: value})
    }
    
    function handleSelectEdit(index:number, value:string, type: "equipe" | "cargo") {
        setTeams((prevTeams) => {
            return prevTeams.map((item, i) => {
                if(i === index) {
                    const [equipe, cargo] = item.split(" - ")
                    return type === 'equipe' ? `${value} - ${cargo}` : `${equipe} - ${value}`
                }
                return item
            })
        })
    }
    
    async function submit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSignupAdm({...signupAdm, ["cargo"]: teams})
        try {

            const response = await axios.post(
                "http://localhost:8080/admin/criar",
                signupAdm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", // Tipo de conteúdo
                    },
                }
            );
        
            setMsg(response.data.message)
        } catch (error) {
            if(axios.isAxiosError(error)) {
                setMsg(error?.response?.data?.message)
            }
        }
    }
        
    

    return (
        <InformationBox>
            <h1 className="font-bold text-4xl text-center">Cadastro de Administrador</h1>
            
            <p className={`text-center ${color} font-semibold`}>{msg}</p>
                        <form className="flex flex-col px-10 py-5" onSubmit={submit}>
                            <div className="flex flex-row flex-wrap px-10 py-5 justify-around">
                                <div className="flex flex-col">
                                    <Input
                                        type="text"
                                        placeholder="Digite o nome"
                                        name="nome"
                                        size={40}
                                        icon={<RiIdCardLine size={30} />}
                                        onChange={handleOnchange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Digite o CPF"
                                        name="cpf"
                                        size={40}
                                        icon={<Bs123 size={30} />}
                                        onChange={handleOnchange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Crie uma senha"
                                        name="senha"
                                        size={40}
                                        icon={<TbLock size={30} />}
                                        onChange={handleOnchange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Digite o telefone"
                                        name="telefone"
                                        size={40}
                                        icon={<MdOutlineLocalPhone size={30} />}
                                        onChange={handleOnchange}
                                    />
                                </div>
                                <div className="flex flex-col gap-8">
                                    <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl"> Equipes do IEEE</h2>
                                        {teams.map((item, index) => (
                                            <div key={index} className="flex flex-wrap">
                                                <Select 
                                                    group_options={team}
                                                    text="equipe"
                                                    value={item.split("-")[0].trim()}
                                                    onChange={(event) => handleSelectEdit(index, event.target.value, "equipe")}
                                                />
                                                
                                                <Select
                                                    options={['Lider', 'Membro']}
                                                    text="cargo"
                                                    value={item.split("-")[1].trim()}
                                                    onChange={(event) => handleSelectEdit(index, event.target.value, "cargo")}
                                                />
                                            </div>
                                        ))

                                        }    
                                        
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-5">
                                <SubmitButton text="Cadastrar" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3 text-2xl" />
                            </div>
                        </form>
        </InformationBox>
    )
}