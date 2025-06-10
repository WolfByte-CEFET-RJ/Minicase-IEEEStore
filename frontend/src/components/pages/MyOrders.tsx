import { useState, useEffect } from "react"
import Orders from "../layout/Orders"
import axios from "axios"
import useUserContext from "../../hooks/useUseContext"

interface Order {
    comprovante: "string",
    data: "string",
    estado_pedido: "string",
    id: "number",
    id_usuario: "number",
    mensagem: "string",
    metodo_pagamento: "string",
    preco_final: "number"
}

export default function MyOrders() {

    const [orders, setOrders] = useState<Order[]>()
    const { userId } = useUserContext()
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')

    useEffect(() => {
        axios.get(`http://localhost:8080/pedido/view/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            const pedidos:Order[] = res.data?.message?.pedidos.map((obj: Order) => ({
                ...obj,
                data: new Date(obj.data).toLocaleString('pt-BR')
            }));

            setOrders(pedidos)
        })
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <h2 className="font-bold text-4xl pt-10 pb-2 mb-5">Meus pedidos</h2>
            
            {orders && orders.map((order) => (
                <Orders
                    key={order.id}
                    ordersDate={order.data}
                    price={order.preco_final}
                    products=""
                    status={order.estado_pedido + ". " + order?.mensagem}
                />
            ))}
        </div>
    )
}