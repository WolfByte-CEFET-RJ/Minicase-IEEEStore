const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);



async function viewUserOrder(userId){
    try{
        const id = userId;
        
        const viewOwnOrder = await knex("pedido").select("*").where({id_usuario: id}).first();
        const getOrderId = await knex("pedido").select("id").where({id_usuario:id}).first();
        const item = await knex("item").select("*").where({id_pedido: getOrderId.id})
        if(!viewOwnOrder){
            throw new Error("Não há pedidos.");
        }
        return {pedidos: viewOwnOrder, itens: item};
    }catch(err){
        console.error("Erro ao localizar pedidos.");
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