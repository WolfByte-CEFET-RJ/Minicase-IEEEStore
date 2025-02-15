import Input from "../../form/Input";
import Select from "../../form/Select";
import InformationBox from "../../layout/InformationBox";
import { IoShirtOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { PiChartLineUp } from "react-icons/pi";
import SubmitButton from "../../form/SubmitButton";
import { useNavigate } from "react-router";


export default function SignupProduct() {
    const navigate  = useNavigate()
    const productType = ['Camisas', 'Copos e Canecas', 'Ecobags', 'Bottons']

    return (
        <InformationBox className="border-4 border-gray-400 w-fit p-10 m-auto">
            <h1 className="font-bold text-4xl text-center mb-5">Cadastro de produto</h1>
            <form>
                <Input type="text" name="nome" size={30} icon={<IoShirtOutline size={30} />} placeholder="Digite o nome" className="bg-white" />
                <Input type="number" name="preco" size={30} icon={<PiChartLineUp size={30} />} placeholder="Quantidade disponível" className="bg-white" />
                <Input type="number" name="preco" size={30} icon={<HiOutlineCurrencyDollar size={30} />} placeholder="Digite o preço" className="bg-white" />
                <Input type="file" name="foto" size={30} placeholder="Imagem do produto" className="bg-white"  />
                <Select text="produto" options={productType} className="bg-white" sizeFull={true} />
                <div className="flex gap-3 mt-7">
                    <SubmitButton text="Cadastrar produto" className="text-xl bg-blue-900 hover:bg-blue-950 text-white px-8 py-2 " />
                    <button className="bg-blue-800 hover:bg-blue-950 text-white font-bold px-8 py-2 rounded-xl text-xl" onClick={() => navigate('/paymant-details')}>Detalhes pagamento</button>
                </div>
            </form>
        </InformationBox>
    )
}