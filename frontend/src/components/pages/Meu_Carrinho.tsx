import { useState } from "react";

type Product = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  foto: string;
};

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([
    // Exemplos
    { id: 1, nome: "Produto 1", preco: 20.0, quantidade: 1, foto: "url_da_imagem_1" },
    { id: 2, nome: "Produto 2", preco: 35.0, quantidade: 1, foto: "url_da_imagem_2" },
  ]);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.preco * product.quantidade, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center mb-2 p-2 border-b">
                <div className="flex items-center">
                  <img src={product.foto} alt={product.nome} className="w-16 h-16 mr-4" />
                  <div>
                    <p className="font-semibold">{product.nome}</p>
                    <p>Preço: R${product.preco}</p>
                    <p>Quantidade: {product.quantidade}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-semibold text-xl">Total: R${calculateTotal()}</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
