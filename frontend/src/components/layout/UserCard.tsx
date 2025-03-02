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

function UserCard({ user }: UserCardProps ) {

    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-400">
        <p className="font-bold text-black">Nome:{user.nome}</p>
        <p className="font-bold text-black">CPF: {user.cpf}</p>
        <p className="font-bold text-black">Equipe: {user.equipe}</p>
        <p className="font-bold text-black">Cargo: {user.cargo}</p>
        <p className="font-bold text-black">Telefone: {user.telefone}</p>
        <p className="font-bold text-black">Email: {user.email}</p>
        <p className="font-bold text-black">Membro Pagante: {user.membroPagante ? "Sim" : "Não"}</p>
        <p className="font-bold text-black">Idade: {user.idade} anos</p>
      </div>
    );
  }
  {/*Sem botão por enquanto*/}

export default UserCard