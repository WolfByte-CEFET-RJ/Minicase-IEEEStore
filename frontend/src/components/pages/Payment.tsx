import Input from "../form/Input";
import InformationBox from "../layout/InformationBox";
import { RiUserLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { GoLink } from "react-icons/go";
import SubmitButton from "../form/SubmitButton";


export default function Payment() {
    const productType = ['Camisas', 'Copos e Canecas', 'Ecobags', 'Bottons']

    return (
        <InformationBox className="border-4 border-gray-400 w-fit p-10 m-auto">
            <h1 className="font-bold text-4xl text-center mb-5">Dados de Pagamento</h1>
            <form>
                <Input type="text" name="nome" size={30} icon={<RiUserLine size={30} />} placeholder="Nome do destinatário pix" className="bg-white" />
                <Input type="text" name="chavePix" size={30} icon={<RiKey2Fill size={30} />} placeholder="Chave-pix" className="bg-white" />
                <Input type="text" name="linkCheckout" size={30} icon={<GoLink size={30} />} placeholder="Link para check-out" className="bg-white" />
                <Input type="file" name="foto" size={30} placeholder="Imagem do produto" className="bg-white"  />
                <div className="flex gap-3 mt-7">
                    <SubmitButton text="Salvar" className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 w-full text-2xl" />
                </div>
            </form>
        </InformationBox>
    )
}