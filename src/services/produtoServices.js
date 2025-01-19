const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const { configDotenv } = require("dotenv");
configDotenv();

async function viewProdutoId(id) {
    try {
        console.log("ID recebido:", id);
        const produto = await knex("produto").select("*").where({ id }).first();

        console.log("Produto:", produto);
        
        if (!produto) {
            throw new Error("Não foi possível encontrar um produto com esse id.");
        }
        return produto;
    } catch (erro) {
        console.error("Erro:", erro.message);
        throw erro;
    }
}

async function createProduto({ nome, preco, disponivel, foto, qt_estrelas, media_avaliacao }) {
    try {
        const produtoExistente = await knex("produto").select("*").where({id}).first();
        if(produtoExistente){
            throw new Error("Já existe um produto com esse nome.");
        } 
        if(nome === "" || preco === "" || disponivel === "" || foto === ""){
            throw new Error("preencha todos os campos obrigatórios");
        }
        if (typeof preco !== 'number' || preco <= 0) {
            throw new Error("O preço do produto deve ser um número positivo.");
        }
        if (typeof qt_estrelas !== 'number' || qt_estrelas < 0 || qt_estrelas > 5) {
            throw new Error("A quantidade de estrelas deve ser um número entre 0 e 5.");
        }
        if (typeof disponivel !== 'boolean') {
            throw new Error("O campo 'disponivel' deve ser um valor booleano.");
        }

     const [id] = await knex('produto').insert({nome, preco, disponivel, foto, qt_estrelas: qt_estrelas || 0, media_avaliacao: media_avaliacao || 0}).returning("*");
     return "Produto criado com sucesso.";

    } catch (erro) {
        console.error("Erro no service:", erro.message);
        throw new Error("Falha ao criar o produto.");
    }
}


module.exports = {
    viewProdutoId,
    createProduto,
};
