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

async function viewAllProduto(){
    try{
        const produto = await knex("produto").select("*");
        if (produto.length === 0){
            throw new Error("Sem produtos no registro.");
        }
        
        return produto;

    }catch(erro){
        throw(erro);
    }
}

async function createProduto({ nome, preco, disponivel, foto, qt_estrelas, media_avaliacao }) {
    try {
        const produtoExistente = await knex("produto").select("*").where({ nome }).first();
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
        if(qt_estrelas % 0.5 !== 0){
            throw new Error("Quantidade de estrelas pode apenas ser múltiplo de 1/2. Ex: 4.5, 5.")
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


async function updateProduto(id, campos) {
    try {
        const produto = await knex("produto").select("*").where({ id }).first();
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        const camposAtualizar = {};

        if (campos.nome && typeof campos.nome === "string" && campos.nome.trim() !== "") {
            camposAtualizar.nome = campos.nome.trim();
        } else if (campos.nome !== undefined) {
            throw new Error("O campo 'nome' precisa ser uma string válida.");
        }

        if (campos.preco && typeof campos.preco === "number") {
            camposAtualizar.preco = campos.preco;
        } else if (campos.preco !== undefined) {
            throw new Error("O campo 'preco' precisa ser um número válido.");
        }

        if (campos.disponivel !== undefined && typeof campos.disponivel === "boolean") {
            camposAtualizar.disponivel = disponivel
        } else if (campos.disponivel !== undefined) {
            throw new Error("O campo 'disponivel' precisa ser um booleano.");
        }

        if (campos.foto && typeof campos.foto === "string" && campos.foto.trim() !== "") {
            camposAtualizar.foto = campos.foto.trim();
        } else if (campos.foto !== undefined) {
            throw new Error("O campo 'foto' precisa ser uma string válida.");
        }

        if (campos.qt_estrelas && typeof campos.qt_estrelas === "number") {
            camposAtualizar.qt_estrelas = campos.qt_estrelas;
        } else if (campos.qt_estrelas !== undefined) {
            throw new Error("O campo 'qt_estrelas' precisa ser um número válido.");
        }

        if (Object.keys(camposAtualizar).length === 0) {
            throw new Error("Nenhum campo válido para atualizar foi fornecido.");
        }

        await knex("produto").where({ id }).update(camposAtualizar);

        return "Produto atualizado com sucesso.";
    } catch (erro) {
        console.error("Erro no serviço de atualização:", erro.message);
        throw new Error("Falha ao atualizar o produto.");
    }
}

async function deleteProduto(id) {
    try {
  
      const ProdutoExistente = await knex("produto").select("*").where({ id });
      
      if (!ProdutoExistente) {
        throw new Error("Produto não encontrado.");
      }
  

      await knex("produto").where({ id }).del();
      
      return "Produto deletado com sucesso!";
    } catch (erro) {
      throw erro;
    }
  }

module.exports = {
    viewProdutoId,
    viewAllProduto,
    createProduto,    
    updateProduto,
    deleteProduto
};
