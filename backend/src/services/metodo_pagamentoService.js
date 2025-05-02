const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const { configDotenv } = require("dotenv");
configDotenv();


async function findOneMetodo_Pagamento() {
    return await knex("metodo_pagamento").select("*").first(); 
}

async function updateMetodo_Pagamento(campos) {
    try {
        const metodo_pagamento = await knex("metodo_pagamento").select("*").first();
        if (!metodo_pagamento) {
            throw new Error("Metodo não encontrado não encontrado.");
        }

        const camposAtualizar = {};

        if (campos.nome_destinatario && typeof campos.nome_destinatario === "string" && campos.nome_destinatario.trim() !== "") {
            camposAtualizar.nome_destinatario = campos.nome_destinatario.trim();
        } else if (campos.nome_destinatario !== undefined) {
            throw new Error("O campo 'nome_destinatário' precisa ser uma string válida.");
        }
        if (campos.chave_pix && typeof campos.chave_pix === "string" && campos.chave_pix.trim() !== "") {
            camposAtualizar.chave_pix = campos.chave_pix.trim();
        } else if (campos.chave_pix !== undefined) {
            throw new Error("O campo 'chave_pix' precisa ser uma string válida.");
        }
        if (campos.link_checkout && typeof campos.link_checkout === "string" && campos.link_checkout.trim() !== "") {
            camposAtualizar.link_checkout = campos.link_checkout.trim();
        } else if (campos.link_checkout !== undefined) {
            throw new Error("O campo 'link_checkout' precisa ser uma string válida.");
        }

        

        if (Object.keys(camposAtualizar).length === 0) {
            throw new Error("Nenhum campo válido para atualizar foi fornecido.");
        }

        await knex("metodo_pagamento").update(camposAtualizar);
        
        return "Metodo pagamento atualizado com sucesso.";
    } catch (erro) {
        console.error("Erro no serviço de atualização:", erro.message);
        throw new Error("Falha ao atualizar o produto.");
    }
}

module.exports = {
    findOneMetodo_Pagamento,
    updateMetodo_Pagamento,
    
};