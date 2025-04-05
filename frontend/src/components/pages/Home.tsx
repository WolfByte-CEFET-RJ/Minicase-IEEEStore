import ProductCategorySection from "../layout/ProductCategorySection"
import ProductCard from "../layout/ProductCard"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";


export default function Home() {   

    type Product = {
        id: number,
        nome: string,
        foto: string,
        preco: number,
        quantidade: number,
        media_avaliacao: number,
        qt_avaliacoes: number,
        qt_estrelas: number
    };

    const navigate = useNavigate()

    const [products, setProducts] = useState<Product[]>([])
    const url = 'http://localhost:8080/produto'
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')
    let shirt = Array.isArray(products) ? products.filter((product) => product.nome.includes("Camisa")) : [];

    useEffect(() => {
        if(token === null) {
            navigate('/login')
        } else {
            getProduct()
        }
        async function getProduct() {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                setProducts(response.data.message)
            } catch (error) {
                console.error(error)
            }
        }
    }, [])

    return (
        <div>
            <ProductCategorySection nameCategory="Camisas">
                {shirt.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        imgSrc={product.foto}
                        imgAlt="imagem do produto"
                        nameProduct={product.nome}
                        price={product.preco}
                        available={"+" + product.quantidade + " disponíveis"}
                        rating={product.media_avaliacao}
                        type="buy"
                    />
                ))}
            </ProductCategorySection>
            
            <ProductCategorySection nameCategory="Copos">
                {/* <ProductCard imgSrc="https://atelierdascanecas.com.br/wp-content/uploads/2022/07/caneca-desenrola-bate-pega-caf%C3%A9zinho-atelier-das-canecas-personalizadas.jpg" imgAlt="Caneca Branca" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJ18gPn3_5voHaMuaV6XPhI9RCeIApxlCjA&s" imgAlt="Caneca Preta" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://atelierdascanecas.com.br/wp-content/uploads/2022/07/caneca-desenrola-bate-pega-caf%C3%A9zinho-atelier-das-canecas-personalizadas.jpg" imgAlt="Caneca Branca" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJ18gPn3_5voHaMuaV6XPhI9RCeIApxlCjA&s" imgAlt="Caneca Preta" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://atelierdascanecas.com.br/wp-content/uploads/2022/07/caneca-desenrola-bate-pega-caf%C3%A9zinho-atelier-das-canecas-personalizadas.jpg" imgAlt="Caneca Branca" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJ18gPn3_5voHaMuaV6XPhI9RCeIApxlCjA&s" imgAlt="Caneca Preta" nameProduct="Caneca Branca" price="15,00" available="Sim" rating="10" /> */}
            </ProductCategorySection>
            <ProductCategorySection nameCategory="Bottons">
                {/* <ProductCard imgSrc="https://img.elo7.com.br/product/685x685/45FED26/10-bottons-3-5-rock-roll-botons-button-pins-broches.jpg" imgAlt="Botton Preto" nameProduct="Botton Preto" price="10,00" available="Sim" rating="10" />

                <ProductCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbo-tO_xPiYqUPCTjeoQFA9CJn9-3lRRJOA&s" imgAlt="Botton Preto" nameProduct="Botton Preto" price="10,00" available="Sim" rating="10" /> */}
            </ProductCategorySection>
        </div>
    )
}