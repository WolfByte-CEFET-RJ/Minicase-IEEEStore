const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);

//const carrinho = JSON.parse(localStorage.getItem("carrinho"))

async function createOrder({preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem}) {
    try {
        if (!preco_final || !metodo_pagamento || !comprovante) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        if (typeof preco_final !== "number" || preco_final <= 0) {
            throw new Error("Preço final não está sendo recebido como um número positivo.");
        }

        const [pedido] = await knex("pedido").insert({
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido: "EM_ANALISE",
            mensagem: "Quando o pedido for entregue, aqui haverá informações sobre a retirada do produto"
        });

        return pedido;
    } catch (erro) {
        console.error("Erro ao criar pedido", erro);
        throw erro;
    }
}

module.exports = {
    createOrder
};