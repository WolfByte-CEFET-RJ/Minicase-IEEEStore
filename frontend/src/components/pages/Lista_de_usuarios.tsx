import { useEffect, useState } from "react"
import UserCard from "../layout/UserCard"
import axios from "axios"

function UserList(){

    interface Usuario {
        id: number;
        nome: string;
        cpf: string;
        equipe: string;
        cargo: string;
        telefone: string;
        email: string;
        membroPagante: boolean;
        idade: number;
      }

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUsuarios(){
            try{
                const response = await axios.get("https://localhost:8080/cliente"); {/*Necessita verificar se é a rota verdadeira*/}
                console.log(response.data)
                setUsuarios(response.data)
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                if(axios.isAxiosError(error)) {
                    setError(error?.response?.data?.message)
                }
            }
        }
        loadUsuarios()
      }, [])

    return(
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {usuarios.length > 0 ? (
                    usuarios.map((usuario) => <UserCard key={usuario.id} user={usuario} />)) : 
                    (<p className="text-gray-500 text-center col-span-3">Nenhum usuário encontrado.</p>
                )}
                </div>
        </div>
    )
}

export default UserList;