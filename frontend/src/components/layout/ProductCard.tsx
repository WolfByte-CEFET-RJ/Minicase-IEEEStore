import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Modal from "./Modal"
import axios from "axios"
import useUserContext from "../../hooks/useUseContext";

export type Product = {
    id_product: number,
    nameProduct: string
    imgSrc: string
    imgAlt: string
    preco: number
};

interface ProductCardProps {
    id: number
    imgSrc: string
    imgAlt: string
    nameProduct: string
    price: string | number
    available: string
    rating: string | number
    type: 'buy' | 'adm'
    products?: Product[]
    setProducts?: (listProducts: Product[]) => void
    setMsg?: (msg: string) => void
}

export default function ProductCard(props: ProductCardProps) {

    const [img, setImg] = useState<string | null>(null);
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    const {userId} = useUserContext()
    // console.log(userId);
    
    useEffect(() => {
        async function getImage(id: number) {
            try {
                const response = await axios.get(`http://localhost:8080/produto/imagem/${id}`,{
                    responseType: 'blob', // Força a resposta a ser tratada como um arquivo binário
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // Criar URL temporária para exibir a imagem
                const imageUrl = URL.createObjectURL(response.data);
                setImg(imageUrl);
            } catch(error) {
                console.log(error)
            }
        }
        getImage(props.id)
    }, [])

    async function deleteProduct() {
        const url = `http://localhost:8080/produto/${props.id}`
        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(props.products && props.setProducts) {
                props.setProducts(props.products.filter((product) => product.id_product !== props.id))
            }
            if(props.setMsg) props.setMsg(response.data?.message)
            setIsOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    function addOrder() {

        const orderLocalStore = localStorage.getItem("order");
        let order = orderLocalStore ? JSON.parse(orderLocalStore) : {id_user: userId, produtos: [], preco_final: 0};
        
        const productInCart = order.produtos.some((produto: Product) => produto.id_product == props.id)

        if(!productInCart) {
            order.produtos.push({id_produto:props.id, name: props.nameProduct, imgSrc: props.imgSrc, imgAlt: props.imgAlt, preco: props.price, quantidade: 1})
            order.preco_final += props.price
            localStorage.setItem("order", JSON.stringify(order))
        }
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-64 border-zinc border-2 rounded-lg bg-white">
                {props.type === 'buy' ? (
                    <>
                        <div className="p-2">
                            {img && (<img src={img} alt={props.imgAlt} className="w-64 h-64" />)}
                        </div>
                            
                        <div className="border-t-2 p-2 flex flex-col gap-1.5">
                            <p><span className="font-bold">Nome:</span> {props.nameProduct}</p>
                            <p><span className="font-bold">Preço:</span> R${props.price}</p>
                            <p><span className="font-bold">Disponível:</span> {props.available}</p>
                            <p><span className="font-bold">Avaliação:</span> {props.rating}</p>
                            <button className="bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-1 rounded" onClick={() => navigate('/product/' + props.id)}>Ver Produto</button>
                            <button className="bg-blue-700 hover:bg-blue-800 w-full text-white font-bold py-1 rounded" onClick={addOrder}>Adicionar ao Carrinho</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-2"><img src={props.imgSrc} alt={props.imgAlt} className="w-64 h-64" /></div>
                        <div className="border-t-2 p-2 flex flex-col gap-1.5">
                            <p><span className="font-bold">Nome:</span> {props.nameProduct}</p>
                            <p><span className="font-bold">Preço:</span> R${props.price}</p>
                            <p><span className="font-bold">Disponível:</span> {props.available}</p>
                            <p><span className="font-bold">Avaliação:</span> {props.rating}</p>
                            <div className="flex flex-row flex-wrap gap-3">
                                <button className="bg-blue-800 hover:bg-blue-900 w-28 text-white font-bold py-1.5 rounded" onClick={() => navigate(`/editar-produto/${props.id}`)}>Editar</button>
                                <button className="bg-red-600 hover:bg-red-500 w-28 text-white font-bold py-1.5 rounded" onClick={() => setIsOpen(true)}>Excluir</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="h-36 px-10 py-7">
                    <p className="text-lg font-semibold">Deseja realmente <span className="text-red-500">excluir</span> este produto?</p>
                    <button type="button" className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 rounded-xl mt-5" onClick={() => setIsOpen(false)}>Não</button>
                    <button type="button" className="bg-red-700 hover:bg-red-500 text-white px-5 py-2 rounded-xl mt-5 ml-3" onClick={deleteProduct}>Sim</button>
                </Modal>
        </>
    )
}