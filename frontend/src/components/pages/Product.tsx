import { useState } from "react"
import Header from '../layout/Header'
import Page from "./Page"


interface ProductProps {
    imgSrc?: string
    imgAlt?: string
    nameProduct?: string
    price?: string
    available?: string
    rating?: string
}


export default function Product(props: ProductProps) {

    const [quantity, setQuantity] = useState<number>(1)
    let product: ProductProps = {imgSrc:"data:image/jpeg;base64,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", imgAlt:"imagem do produto", nameProduct:"Camisa Preta", price:"50,00" ,available:"Sim", rating:"10"}

    return (
        <>
        <Header />
        <Page>
        <section className="p-5 mt-10 shadow-md">
            <div className="flex flex-row items-center">
                <img src={product.imgSrc} alt={product.imgAlt} className="w-80" />
                <div className="flex flex-col gap-6 border-l pl-10">
                    <h2 className="font-bold text-3xl">{product.nameProduct}</h2>
                    <p className="text-xl">R$ {product.price}</p>
                    <div className="flex flex-row items-center border border-blue-800 justify-between px-2 py-1 rounded-xl w-24 text-xl">
                        <button className="font-bold" onClick={() => setQuantity((quantity) => Math.max(quantity - 1, 1))}>-</button>
                        <p>{quantity}</p>
                        <button className="font-bold" onClick={() => setQuantity((quantity) => quantity + 1)}>+</button>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Comprar</button>
                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </section>
        </Page>
        </>
    )
}