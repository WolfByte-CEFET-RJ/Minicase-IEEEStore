const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);



async function viewUserOrder(userId){
    try {
        const pedidos = await knex("pedido").select("*").where({ id_usuario: userId });

        if (!pedidos || pedidos.length === 0) {
            throw new Error("Não há pedidos.");
        }

        const pedidoIds = pedidos.map(p => p.id); // extrai os IDs dos pedidos

        const itens = await knex("item").select("*").whereIn("id_pedido", pedidoIds);

        return { pedidos, itens };

    } catch (err) {
        console.error("Erro ao localizar pedidos:", err.message);
        throw err; // importante lançar o erro para o controller capturar corretamente
    }
}

async function viewAllOrders(){
    try{
      const viewAllPedido = await knex("pedido").select("*");
      const viewAllItens = await knex("item").select("*");
      if(!viewAllPedido){
        throw new Error("Sem pedidos");
      }
      return {message: "Pedidos feitos:", viewAllPedido, produtos: "Itens:",viewAllItens};
    }catch(err){
      throw err;
    }
  }

async function createOrder({id_usuario,preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem}) {
    try {
        if (!preco_final || !metodo_pagamento || !comprovante) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        if (typeof preco_final !== "number" || preco_final <= 0) {
            throw new Error("Preço final não está sendo recebido como um número positivo.");
        }
        if(!id_usuario){
            throw new Error("Preencha a quem pertence este pedido.")
        }

        const [pedido] = await knex("pedido").insert({
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido: "EM_ANALISE",
            mensagem: "Quando o pedido for entregue, aqui haverá informações sobre a retirada do produto",
            id_usuario
        });

        return pedido;
    } catch (erro) {
        console.error("Erro ao criar pedido", erro);
        throw erro;
    }
}

module.exports = {
    createOrder,
    viewAllOrders,
    viewUserOrder,

};