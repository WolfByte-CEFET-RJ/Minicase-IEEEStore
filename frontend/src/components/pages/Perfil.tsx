import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import Select from "../form/Select"
import { BiEditAlt } from "react-icons/bi";
import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import useUserContext from "../../hooks/useUseContext";
import Modal from "../layout/Modal";

export default function Perfil() {

    type UserType = {
        id: number,
        nome: string,
        cargo: string[],
        cpf: string,
        telefone: string,
        email?: string,
    }
    
    const { id } = useParams()
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    let {isAdm} = useUserContext()
    const navigate = useNavigate()
    const selectNumberTeams = 3
    const [user, setUser] = useState<UserType>({ id: 0, nome: '', cargo: Array(selectNumberTeams).fill(" - "), cpf: '', telefone: '' })
    const [isOpen, setIsOpen] = useState(false)
    const [msg, setMsg] = useState('')
        
    const team = {
        'Gestão': ['Gestão de Projetos', 'Gestão de Pessoas', 'Gestão de Processos', 'Gestão financeira'],
        'Marketing': ['Marketing'],
        'RocketWolf': ['Aerodinâmica', 'Estruturas', 'Recuperação', 'Eletrônica', 'Propulsão'],
        'WolfPower': ['Eletrônica/Programação', 'Mecânica', 'Divulgação'],
        'WolfBotz': ['Seguidor de Linha', 'Mini Sumô', 'Combate'],
        'SocialWolf': ['Mecânica', 'Programação', 'Eletrônica', 'Educacional'],
        'WolfByte': ['Inteligência Artificial (IA)', 'Web/App', 'Hardware', 'Games']
    }

    useEffect(() => {
        const url = `http://localhost:8080/admin/${id}`
        async function getUser() {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const user_response = response.data.message.adminInfo
                const {senha, ...user_data} = user_response
                setUser(user_data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

    function handleSelectEdit(index:number, value:string, type: "equipe" | "cargo") {
        setUser((prevUser) => ({ 
            ...prevUser,
            cargo: prevUser.cargo.map((item, i) => {
                if(i === index) {
                    const [equipe, cargo] = item.split(" - ")
                    return type === 'equipe' ? `${value} - ${cargo}` : `${equipe} - ${value}`
                }
                return item
            })
        }))
    }
    
    function handleOnChage(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }
    
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const url = `http://localhost:8080/admin/${id}`
        try {
            const response = await axios.patch(url, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setMsg(response.data?.message)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteUser() {
        const url = `http://localhost:8080/admin/${id}`
        try {
            await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <p className={`text-center font-semibold ${msg === "Admin atualizado com sucesso!" ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>
            <h1 className="font-bold text-4xl pt-10 pb-2">Meu perfil</h1>
            <p className="pb-7 text-gray-500">Clique nos campos abaixo para editar suas informações</p>
            <form onSubmit={submit}>
                {isAdm ? (
                    <>
                        <Input
                            type="text"
                            name="nome"
                            size={30}
                            value={user.nome}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                            onChange={handleOnChage}
                        />
                        <Input
                            type="text"
                            name="cpf"
                            size={30}
                            value={user.cpf}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                            onChange={handleOnChage}
                        />
                        <Input
                            type="text"
                            name="telefone"
                            size={30}
                            value={user.telefone}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                            onChange={handleOnChage}
                        />
                        <Input
                            type="password"
                            name="senha"
                            placeholder="Altere a sua senha"
                            size={30}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                            onChange={handleOnChage}
                        />
                        <div className="flex flex-col gap-8 pb-10">
                            <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl"> Equipes do IEEE</h2>
                            {user.cargo.map((item, index) => (
                                <div key={index} className="flex flex-wrap">
                                    <Select
                                        group_options={team}
                                        text="equipe"
                                        value={item.split("-")[0].trim()}
                                        onChange={(event) => handleSelectEdit(index, event.target.value, "equipe")}
                                        className="bg-white"
                                    />

                                    <Select
                                        options={['Lider', 'Membro']}
                                        text="cargo"
                                        value={item.split("-")[1].trim()}
                                        onChange={(event) => handleSelectEdit(index, event.target.value, "cargo")}
                                        className="bg-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                <div className="flex flex-row gap-4">
                    <SubmitButton text="Salvar" className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 text-2xl" />
                    <button type="button" className="bg-red-700 hover:bg-red-500 text-white px-8 py-2 text-2xl rounded-xl font-semibold" onClick={() => setIsOpen((prev) => !prev)}>Excluir usuário</button>
                </div>
            </form>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="h-36 px-10 py-7">
                    <p className="text-lg font-semibold">Deseja realmente <span className="text-red-500">excluir</span> seu usuário?</p>
                    <button type="button" className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 rounded-xl mt-5" onClick={() => setIsOpen(false)}>Não</button>
                    <button type="button" className="bg-red-700 hover:bg-red-500 text-white px-5 py-2 rounded-xl mt-5 ml-3" onClick={deleteUser}>Sim</button>
            </Modal>
        </div>
    )

}