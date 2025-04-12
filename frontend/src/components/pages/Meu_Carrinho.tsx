import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { productsCart, addProductToCart ,removeProductFromCart, clearCart } = useContext(CartContext)!;

  const calculateTotal = () => {
    return productsCart.reduce((total, product) => total + product.preco * product.quantidade, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Carrinho de Compras</h1>

      {productsCart.length === 0 ? (
        <p className="text-xl">Seu carrinho está vazio</p>
      ) : (
        <div>
          <ul>
            {productsCart.map((product) => (
              <li key={product.id} className="flex items-stretch mb-4 border-[6px] border-gray-300 rounded-xl shadow overflow-hidden">
                <div className="flex items-center">
                  <img src={product.foto} alt={product.nome} className="w-32 h-auto object-cover rounded-l-xl mr-4" />
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <p className="text-2xl font-semibold">{product.nome}</p>
                    <p className="text-lg font-medium">Preço: R${product.preco.toFixed(2)}</p>                
                    <div className="flex items-center gap-5">
                      <p className="text-base">Quantidade:</p>
                      <div className="flex items-center gap-5 border-2 border-[#0D5FAA] rounded-2xl px-5 py-2">
                      <button
                        onClick={() => removeProductFromCart(product.id)}
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
                          onClick={() => addProductToCart(product)}
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
              Total: R${calculateTotal().toFixed(2)}
            </span>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl font-semibold px-4 py-2 rounded-lg"
              >
                Limpar Carrinho
              </button>
              <button className="bg-[#0D5FAA] hover:bg-blue-900 text-white text-xl font-semibold px-6 py-2 rounded-lg">
                Fechar pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
