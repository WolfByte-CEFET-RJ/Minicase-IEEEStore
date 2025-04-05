import { createContext, useState, ReactNode } from "react";
import { Product } from "../components/layout/ProductCard";

type CartItem = Product & { quantidade: number };

interface CartContextType {
  productsCart: CartItem[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [productsCart, setProductsCart] = useState<CartItem[]>([
    {
      id: 1,
      nome: "Camisa IEEE",
      preco: 20.00,
      foto: "https://via.placeholder.com/150",
      quantidade: 1,
      media_avaliacao: 7,
      qt_avaliacoes: 120,
      qt_estrelas: 3.5
    },
    {
      id: 2,
      nome: "Copo IEEE",
      preco: 15.00,
      foto: "https://via.placeholder.com/150",
      quantidade: 3,
      media_avaliacao: 8,
      qt_avaliacoes: 25,
      qt_estrelas: 4
    },
  ]);

  function addProductToCart(product: Product) {
    const copyProductsCart = [...productsCart];

    const alreadyInCart = copyProductsCart.find((item) => item.id === product.id);

    if (!alreadyInCart) {
      copyProductsCart.push({ ...product, quantidade: 1 });
    } else {
      alreadyInCart.quantidade += 1;
    }

    setProductsCart(copyProductsCart);
  }

  function removeProductFromCart(id: number) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (item && item.quantidade > 1) {
      item.quantidade = item.quantidade - 1;
      setProductsCart(copyProductsCart);
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      );
      setProductsCart(arrayFiltered);
    }
  }

  function clearCart() {
    setProductsCart([]);
  }

  return (
    <CartContext.Provider
      value={{ productsCart, addProductToCart, removeProductFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}