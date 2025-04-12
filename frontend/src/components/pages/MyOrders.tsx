import Orders from "../layout/Orders"

export default function MyOrders() {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <h2 className="font-bold text-4xl pt-10 pb-2 mb-5">Lista de Usuários</h2>
            <Orders 
                ordersDate="10/10/1999"
                price="60,00"
                products="Camisa do IEEE"
                status="Aguardando pagamento do pedido."
            />
            <Orders 
                ordersDate="10/10/1999"
                price="20,00"
                products="Copo do IEEE"
                status="Pedido em analise. Verifique o Status novamente em algumas horas."
            />
        </div>
    )
}