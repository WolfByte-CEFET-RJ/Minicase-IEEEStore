const pedidoServices = require("../services/pedidoServices.js");

async function createOrder(req, res) {
    try {
        let { preco_final, metodo_pagamento, estado_pedido, mensagem } = req.body;
        const comprovante = req.file.path;
        preco_final = parseFloat(preco_final);
        const pedidoService = await pedidoServices.createOrder({
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido,
            mensagem
        });
        
        res.json({ status: true, message: pedidoService });
        
    } catch (erro) {
        console.log(erro);
        res.json({ status: false, message: erro.message });
    }
}

module.exports = {
    createOrder,
};
