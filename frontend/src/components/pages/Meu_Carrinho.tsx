import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUseContext";
import { useNavigate } from "react-router";

type Product = {
  id_produto: number,
  name: string
  imgSrc: string
  imgAlt: string
  preco: number
  quantidade: number
};

export default function Cart() {

  const [products, setProducts] = useState<Product[]>([])
  const orderLocalStore = localStorage.getItem("order")
  const {userId} = useUserContext()
  let order = orderLocalStore ? JSON.parse(orderLocalStore) : {id_user: userId, produtos: [], preco_final: 0};
  const [finalPrice, setFinalPrice] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if(orderLocalStore != null) {
      setProducts(order.produtos)
    }
  }, [])

  useEffect(() => {
    const orderLocalStore = localStorage.getItem("order");
    const order = orderLocalStore
      ? JSON.parse(orderLocalStore)
      : { id_user: userId, produtos: [], preco_final: 0 };
  
    order.produtos = products;
    order.preco_final = calculateTotal(products); // opcional, se quiser atualizar o total também
  
    localStorage.setItem("order", JSON.stringify(order));
  }, [products, userId]);
  

  function clearCart() {
    localStorage.removeItem("order")
    setProducts([])
  }

  function calculateTotal(products: Product[]) {
    if (!Array.isArray(products)) {
      return 0;
    }
    const total = products.reduce((soma, product) => {
      return soma + (product.preco * product.quantidade);
    }, 0);
    setFinalPrice(total)
    return total
  }

  function removeProductFromCart(id_product:number) {
    setProducts((products) => {
      return products.map((product) => {
        return product.id_produto === id_product ? {...product, quantidade: product.quantidade - 1} : product
      })
    })
  }

  function addProductToCart(id_product:number) {
    setProducts((products) => {
      return products.map((product) => {
        return product.id_produto === id_product ? {...product, quantidade: product.quantidade + 1} : product
      })
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Carrinho de Compras</h1>

      {products && products.length === 0 ? (
        <p className="text-xl">Seu carrinho está vazio</p>
      ) : (
        <div>
          <ul>
            {products && products.map((product: Product) => (
              <li key={product.id_produto} className="flex items-stretch mb-4 border-[6px] border-gray-300 rounded-xl shadow overflow-hidden">
                <div className="flex items-center">
                  <img src={product.imgSrc} alt={product.imgAlt} className="w-32 h-auto object-cover rounded-l-xl mr-4" />
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <p className="text-2xl font-semibold">{product.name}</p>
                    <p className="text-lg font-medium">Preço: R${product.preco.toFixed(2)}</p>                
                    <div className="flex items-center gap-5">
                      <p className="text-base">Quantidade:</p>
                      <div className="flex items-center gap-5 border-2 border-[#0D5FAA] rounded-2xl px-5 py-2">
                      <button
                        onClick={() => removeProductFromCart(product.id_produto)}
                        disabled={product.quantidade === 1}
                        className={`px-2 rounded-md text-xl font-medium ${
                          product.quantidade === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}>
                        -
                      </button>
                        <span className="font-medium">{product.quantidade}</span>
                        <button
                          onClick={() => addProductToCart(product.id_produto)}
                          className="bg-gray-200 px-2 rounded-md text-xl font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-semibold text-xl">
              Total: R${finalPrice && finalPrice.toFixed(2)}
            </span>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl font-semibold px-4 py-2 rounded-lg"
              >
                Limpar Carrinho
              </button>
              <button className="bg-[#0D5FAA] hover:bg-blue-900 text-white text-xl font-semibold px-6 py-2 rounded-lg" onClick={() => navigate('/detalhes-de-pagamento')}>
                Fechar pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
