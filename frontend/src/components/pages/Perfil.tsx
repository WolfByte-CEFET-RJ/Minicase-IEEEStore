import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import Select from "../form/Select"
import { BiEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"

export default function Perfil() {

    type UserType = {
        id: number, 
        nome: string,
        cargo: [],
        cpf: string,
        telefone:string,
        email?: string
    }

    const {id} = useParams()
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    const [user, setUser] = useState<UserType>({id: 0, nome: '', cargo: [], cpf: '', telefone:''})
    const [isAdm, setIsAdm] = useState(true)
    console.log(user)
    useEffect(() => {
        const url = `http://localhost:8080/admin/${id}`
        async function getUser() {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.message.adminInfo)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

    return (
        <div>
            <h1>Meu perfil</h1>
            <p>Clique nos campos abaixo para editar suas informações</p>
            <form>
                {isAdm ? (
                    <>
                        <Input
                            type="text"
                            name="nome"
                            size={30}
                            value={user.nome}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                        />
                        <Input
                            type="text"
                            name="cpf"
                            size={30}
                            value={user.cpf}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                        />
                        <Input
                            type="text"
                            name="telefone"
                            size={30}
                            value={user.telefone}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                        />
                        <Input
                            type="text"
                            name="senha"
                            placeholder="Altere a sua senha"
                            size={30}
                            className="bg-white"
                            icon={<BiEditAlt size={30} />}
                        />
                    </>
                ) : (
                    <>
                    </>
                )}
                <SubmitButton text="Salvar" className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 text-2xl" />
            </form>
        </div>
    )

}