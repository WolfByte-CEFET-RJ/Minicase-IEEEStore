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

interface UserCardProps {
  user: Usuario;
}

function UserCard({ user }: UserCardProps) {

  function handleCargo(positions:string) {
    let pos = ''
    for(let position of positions) {
      if(position.trim() !== '-') {
        pos += position.trim() + ', '
      }
    }
    return pos.slice(0, -2)
  }


  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border-2 border-gray-400 w-64 flex flex-col gap-1">
      <p className="text-black"><span className="font-bold">Nome</span>: {user.nome}</p>
      <p className="text-black"><span className="font-bold">CPF</span>: {user.cpf}</p>
      <p className="text-black"><span className="font-bold">Equipe</span>: {user.equipe}</p>
      <p className="text-black"><span className="font-bold">Cargo(s)</span>: {handleCargo(user.cargo)}</p>
      <p className="text-black"><span className="font-bold">Telefone</span>: {user.telefone}</p>
      <p className="text-black"><span className="font-bold">Email</span>: {user.email}</p>
      <p className="text-black"><span className="font-bold">Membro Pagante</span>: {user.membroPagante ? "Sim" : "Não"}</p>
      <p className="text-black"><span className="font-bold">Idade</span>: {user.idade} anos</p>
    </div>
  );
}

export default UserCard