const knexConfig = require("../../knexfile.js");
const { updateAdmin } = require("./adminServices.js");
const knex = require("knex")(knexConfig.development);


async function serveComprovante(id){                  
    try{        
        const get_comprovante = await knex("pedido").select("comprovante").where({id}).first();
        const comprovantePath = get_comprovante.comprovante;
        return comprovantePath;
    }catch(err){
        return {status:false, message:"Erro ao buscar comprovante"}
    }
}



async function viewUserOrder(userId){
    try{
        const id = userId;
        
        const viewOwnOrder = await knex("pedido").select("*").where({id_usuario: id});
        const getOrderId = viewOwnOrder.map((pedido) => pedido.id);
        const item = await knex("item").select("*").whereIn("id_pedido", getOrderId);
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
 
async function createOrder({id_usuario, preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem, produtos}) {
    try {
        const usuarioExistente = await knex("cliente").where({id: id_usuario}).first();
        if(!usuarioExistente){
            throw new Error("Não existe usuário com esse id no banco");
        }
        for (let item of produtos) {
            console.log("Produto sendo verificado:", item);
            const produto = await knex("produto").where({id: item.id_produto}).first();
            if (!produto) {
                throw new Error("Produto não encontrado no banco de dados");
            }
            const quantidade = item.quantidade
            
            
            if (quantidade <= 0 ){
                throw new Error("Produto fora de estoque.");
            }
            if (quantidade > produto.quantidade){
                throw new Error("Há uma quantidade maior de produtos no carrinho que no estoque.")
            }

            console.log("Produto verificado com sucesso.");
        }
      
        if (!preco_final || !metodo_pagamento || !comprovante) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        if (typeof preco_final !== "number" || preco_final <= 0) {
            throw new Error("Preço final não está sendo recebido como um número positivo.");
        }
        if(!id_usuario){
            throw new Error("O pedido deve ser feito por um usuário autenticado.");
        }

        const acceptedValues = ["credito", "debito", "pix"]

        if(!acceptedValues.includes(metodo_pagamento)){
            throw new Error("Os métodos de pagamento aceitos são apenas pix, credito ou debito.");
        }
        const [pedido] = await knex("pedido").insert({
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido: "EM_ANALISE",
            mensagem: "Quando o pedido for entregue, aqui haverá informações sobre a retirada do produto",
            id_usuario
        });
        const itemsToInsert = produtos.map(item => ({
            id_pedido: pedido, 
            id_produto: item.id_produto,
            quantidade: item.quantidade
        }));

        const [item] = await knex("item").insert( itemsToInsert )

        } catch (erro) {
            console.error("Erro ao criar pedido", erro);
            throw erro;
        }
}  

async function updateOrder({id, id_usuario, preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem}){
    try{
        const order = await knex("pedido").where({id}).first();
                        
        if (!order){
            throw new Error("Não foi possível encontrar este pedido.")
        };

        const camposAtualizar = {
            id_usuario,
            preco_final,
            metodo_pagamento,
            comprovante
          };

        if (typeof mensagem !== "string" || mensagem.trim() === ""){
            throw new Error("A mensagem deve ser uma string dizendo onde e quando pegar o produto.");
        };
        camposAtualizar.mensagem = mensagem.trim();

        if (typeof estado_pedido !== "string"){
            throw new Error("O estado do pedido deve ser alterado.");
        };

        camposAtualizar.estado_pedido = estado_pedido.trim();

        await knex("pedido").where({ id }).update(camposAtualizar);

        return { status: true, message: "Produto atualizado com sucesso!" };

    }catch(erro){
        return {status: false, message: erro.message};
    };
};

module.exports = {
    createOrder,
    viewAllOrders,
    viewUserOrder,
    serveComprovante,
    updateOrder,
};