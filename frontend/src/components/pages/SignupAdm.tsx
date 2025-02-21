import InformationBox from "../layout/InformationBox";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Select from "../form/Select";
import { RiIdCardLine } from "react-icons/ri";
import { Bs123 } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function SignupAdm() {

    const [signupAdm, setSignupAdm] = useState({})
    const selectNumberTeams = 3
    const [teams, setTeams] = useState<string[]>(Array(selectNumberTeams).fill(" - "))
    // console.log(teams)

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
        console.log(signupAdm);
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
        console.log(signupAdm)
        try {
            // Defina o token (pode ser pego do localStorage, state, etc.)
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMTQ3Mzk1LCJleHAiOjE3NDAyMzM3OTV9.nEXqvTSf1vymIwoRYbcO1NXyRudQAsJGmV76Zr-BKbo";
        
            const response = await axios.post(
              "http://localhost:8080/admin/criar",
              signupAdm,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json", // Tipo de conteúdo // Caso precise de um header extra
                },
              }
            );
        
            console.log("Resposta do servidor:", response.data);
          } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            console.log("Ocorreu um erro ao enviar os dados. Tente novamente.");
          }
        }
        
    

    return (
        <InformationBox>
            <h1 className="font-bold text-4xl text-center">Cadastro de Administrador</h1>
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