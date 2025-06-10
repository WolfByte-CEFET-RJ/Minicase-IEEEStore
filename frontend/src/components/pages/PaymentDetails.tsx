import axios from "axios"
import { useEffect, useState } from "react"
import InformationBox from "../layout/InformationBox"
import SubmitButton from "../form/SubmitButton"
import useUserContext from "../../hooks/useUseContext"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PaymentDetails {
  chave_pix: string,
  link_checkout: string,
  nome_destinatario: string
}

interface ProdutoPedido {
  id_produto: number,
  name: string
  imgSrc: string
  imgAlt: string
  preco: number
  quantidade: number
}

interface Order {
  id_user: number;
  produtos: ProdutoPedido[];
  preco_final: number;
}

export default function PaymentDetails() {

  const navigate = useNavigate()

  const [paymentDateails, setPaymentDetails] = useState<PaymentDetails>({
    chave_pix: "",
    link_checkout: "",
    nome_destinatario: ""
  })

  const { userId } = useUserContext()
  const orderLocalStore = localStorage.getItem("order")
  let order: Order = orderLocalStore
    ? JSON.parse(orderLocalStore)
    : { id_user: userId, produtos: [], preco_final: 0 }

  const [comprovante, setComprovante] = useState<File | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    axios.get('http://localhost:8080/metodo_pagamento/view', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setPaymentDetails(res.data?.message))
      .catch((error) => console.log(error))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comprovante) {
      alert("Por favor, anexe o comprovante em PDF.")
      return
    }

    const { id_user, preco_final, produtos } = order

    const produtosFiltrados = produtos.map(produto => ({
      id_produto: produto.id_produto,
      quantidade: produto.quantidade
    }))

    const formData = new FormData()
    formData.append("comprovante", comprovante)
    formData.append("id_usuario", String(id_user))
    formData.append("preco_final", String(preco_final))
    formData.append("metodo_pagamento", "PIX") // ou "CARTAO" dependendo da seleção
    formData.append("estado_pedido", "ENVIO_DE_COMPROVANTE_DE_PAGAMENTO")
    formData.append("mensagem", "Pedido criado via frontend.")
    formData.append("produtos", JSON.stringify(produtosFiltrados))

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    try {
      const res = await axios.post("http://localhost:8080/pedido", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem("order")
      toast.success('Operação realizada com sucesso!', {
        className: 'bg-green-700 text-white rounded-lg shadow-lg px-4 py-3',
        progressClassName: 'bg-green-300',
        icon: () => <>✅</>
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar comprovante:", error)
      toast.error("Algo deu errado!");
    }
  }

  return (
    <div className="w-fit m-auto">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <h1 className="font-bold text-4xl pt-10 pb-2">Pagamento do pedido</h1>
      <InformationBox className="border-4 border-gray-400 w-fit p-10">
        <h2 className="text-xl font-semibold before:mr-1 before:text-4xl">
          Valor total do pedido: <span>R$ {order ? order.preco_final.toFixed(2) : 0.00}</span>
        </h2>
        <p>Escolha sua forma de pagamento: faça um <span className="font-semibold">PIX</span> com o valor total do pedido ou clique no <span className="font-semibold">link de checkout</span> para pagar com cartão.</p>
        <p>Após efetuar o pagamento do pedido <span className="font-semibold">anexe o comprovante</span> e depois clique em enviar.</p>

        <h2 className="text-xl font-semibold before:content-['.'] before:mr-1 before:text-4xl">Pix</h2>
        <p>Para o pagamento do seu pedido com pix use a <span className="font-semibold">chave-pix</span>: {paymentDateails.chave_pix} </p>

        <h2 className="text-xl font-semibold before:content-['.'] before:mr-1 before:text-4xl">Cartão</h2>
        <p>Link para <span className="font-semibold">check-out</span>: {paymentDateails.link_checkout} </p>

        <form className="flex gap-3" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="bg-blue-800 hover:bg-blue-950 text-white font-bold px-8 py-2 rounded-xl text-xl cursor-pointer">Anexar comprovante</label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            name="comprovante"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setComprovante(e.target.files[0])
              }
            }}
          />
          <SubmitButton text="Enviar" className="text-xl bg-blue-900 hover:bg-blue-950 text-white px-8 py-2" />
        </form>
      </InformationBox>
    </div>
  )
}
