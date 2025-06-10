
interface OrdersProps {
    ordersDate: string,
    products: string,
    price: string,
    status: string
}

export default function Orders(props: OrdersProps) {

    return(
        <div className="border-4 border-gray-300 rounded p-4 flex flex-col gap-1">
            <p><span className="font-bold">Data do pedido: </span>{props.ordersDate}</p>
            <p><span className="font-bold">Produtos: </span>{props.products}</p>
            <p><span className="font-bold">Preço final: </span>R$ {props.price}</p>
            <p><span className="font-bold">Status: </span>{props.status}</p>
            {/* <button className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-1 text-xl rounded w-fit" onClick={payOrders}>Pagar pedido</button> */}
        </div>
    )
}