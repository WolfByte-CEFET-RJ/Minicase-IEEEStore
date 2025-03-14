const metodo_pagamentoService = require("../services/metodo_pagamentoService.js");


async function findOneMetodo_Pagamento(req, res){
    try{
        const readAllService = await metodo_pagamentoService.findOneMetodo_Pagamento();
        res.json({status: true, message: readAllService});
        console.log("Controlador executado.");        
    }catch(erro){
        console.error("Erro no controller:", erro);
        res.json({status: false, message: erro.message});
}
}



async function updateMetodo_Pagamento(req, res) {
    try {
        const { nome_destinatario, chave_pix, link_checkout } = req.body;
        console.log("Dados recebidos no controller:", { nome_destinatario, chave_pix, link_checkout });

        const metodoPagamento = await metodo_pagamentoService.findOneMetodo_Pagamento();
        if (!metodoPagamento) {
            return res.status(404).json({ status: false, message: "Nenhum método de pagamento encontrado." });
        }
        await metodo_pagamentoService.updateMetodo_Pagamento({ nome_destinatario, chave_pix, link_checkout });

        res.status(200).json({ status: true, message: "Método de pagamento atualizado com sucesso!", metodoPagamento });
    } catch (erro) {
        console.error("Erro no controller:", erro);
        res.status(400).json({ status: false, message: erro.message });
    }
}


module.exports={
    findOneMetodo_Pagamento,
    updateMetodo_Pagamento,


}