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
        nome: "",
        CPF: "", 
        telefone: "", 
        email: "", 
        senha: "", 
        equipeCargo: [],
        pagante: false, 
    })

    const [selectData, setSelectData] = useState<{ equipe: string; cargo: string }[]>(
        Array(3).fill({ equipe: "", cargo: "" }) // Cria um array inicial com 3 objetos, cada um contendo "equipe" e "cargo" vazios.
        // Se quiser 50 selects no futuro, basta mudar "Array(3)" para "Array(50)".
      );

      const handleSelectEdit = (index: number, field: "equipe" | "cargo", value: string) => {
        setSelectData(prev => 
            prev.map((item, i) => 
                i === index ? { ...item, [field]: value } : item 
                // Se o índice atual for o mesmo do item modificado, atualiza o valor do campo (equipe ou cargo).
                // Se não, mantém o item original.
            )
        );
        console.log(selectData)
    };

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(" ")

    const handleFormEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    };

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        console.log(formData)

        try{ //Tem que confirmar qual a URL e o endpoint usado pelo backend
            //const response = await axios.post("http://localhost:3000/cadastro",formData)
            //console.log("Resposta do servidor:", response.data);
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
                    <div className="flex flex-col">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            size={40}
                            value ={formData.nome}
                            icon={<RiIdCardLine size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu CPF"
                            name="CPF"
                            size={40}
                            value ={formData.CPF}
                            icon={<Bs123 size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="text"
                            placeholder="Digite seu telefone"
                            name="telefone"
                            size={40}
                            value ={formData.telefone}
                            icon={<MdOutlineLocalPhone size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="email"
                            placeholder="Digite seu email"
                            name="email"
                            size={40}
                            value ={formData.email}
                            icon={<MdAlternateEmail size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                        <Input
                            type="password"
                            placeholder="Crie uma senha"
                            name="senha"
                            size={40}
                            value ={formData.senha}
                            icon={<TbLock size={30} />}
                            onChange={(e) => {handleFormEdit(e)}}
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-semibold before:content-['.'] before:ml-0.5 before:text-6xl">Você é membro do IEEE?</h2>
                        {/* Mapeia os selects dinamicamente com base no estado "formData" */}
                            {selectData.map((item, index) => (
                                <div key={index} className="flex flex-wrap">
                                    {/* Select para escolher a equipe */}
                                    <Select
                                        group_options={team} // Lista de equipes disponível
                                        text="equipe"
                                        name="equipe"
                                        value={item.equipe} // Valor da equipe referente ao índice atual
                                        onChange={(event) => handleSelectEdit(index, "equipe", event.target.value)} 
                                        // Chama handleSelectEdit passando o índice, "equipe" e o novo valor selecionado
                                    />
                                    
                                    {/* Select para escolher o cargo */}
                                    <Select
                                        options={['Lider', 'Membro']} // Lista fixa de cargos
                                        text="cargo"
                                        name="cargo"
                                        value={item.cargo} // Valor do cargo referente ao índice atual
                                        onChange={(event) => handleSelectEdit(index, "cargo", event.target.value)} 
                                        // Chama handleSelectEdit passando o índice, "cargo" e o novo valor selecionado
                                    />
                                </div>
                            ))}

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
                        text={"Cadastrar"}
                        className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-3 text-2xl"
                    />
                </div>
                {error && <p className="text-black text-xl text-center mt-3">{error}</p>}
            </form>
        </InformationBox>
    )
}