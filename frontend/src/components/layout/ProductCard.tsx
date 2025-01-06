import { useNavigate } from "react-router"

interface ProductCardProps {
    imgSrc: string
    imgAlt: string
    nameProduct: string
    price: string
    available: string
    rating: string
}

export default function ProductCard(props: ProductCardProps) {

    let navigate = useNavigate()

    return (
        <div className="flex flex-col gap-2 w-64 border-zinc border-2 rounded-lg bg-white">
            <div className="p-2"><img src={props.imgSrc} alt={props.imgAlt} className="w-64 h-64" /></div>
            <div className="border-t-2 p-2 flex flex-col gap-1.5">
                <p><span className="font-bold">Nome:</span> {props.nameProduct}</p>
                <p><span className="font-bold">Preço:</span> R${props.price}</p>
                <p><span className="font-bold">Disponível:</span> {props.available}</p>
                <p><span className="font-bold">Avaliação:</span> {props.rating}</p>
                <button className="bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-1 rounded" onClick={() => navigate('/product')}>Ver Produto</button>
                <button className="bg-blue-700 hover:bg-blue-800 w-full text-white font-bold py-1 rounded">Adicionar ao Carrinho</button>
            </div>
        </div>
    )
}