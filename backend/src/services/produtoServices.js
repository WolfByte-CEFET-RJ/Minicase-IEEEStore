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

async function createProduto({ nome, preco, quantidade, foto, qt_estrelas, media_avaliacao }) {
    try {
        const produtoExistente = await knex("produto").select("*").where({ nome }).first();
        if(produtoExistente){
            throw new Error("Já existe um produto com esse nome.");
        } 
        if(nome === "" || preco === "" || quantidade === "" || foto === ""){
            throw new Error("preencha todos os campos obrigatórios");
        }
        if (typeof preco !== 'number' || preco <= 0) {
            throw new Error("O preço do produto deve ser um número positivo.");
        }
        
        if (!Number.isInteger(quantidade)) {
            throw new Error("O campo 'quantidade' deve ser um valor inteiro.");
        }

     const [id] = await knex('produto').insert({nome, preco, quantidade, foto, qt_estrelas: 0, media_avaliacao: 0, qt_avaliacoes: 0});
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

        if (campos.preco !== undefined) {
            if (typeof campos.preco === "number" && campos.preco > 0) {
                camposAtualizar.preco = campos.preco;
            } else {
                throw new Error("O campo 'preco' precisa ser um número válido e maior que zero.");
            }
        }

        if (campos.quantidade !== undefined) {
            if (Number.isInteger(campos.quantidade)) {
                camposAtualizar.quantidade = campos.quantidade;
            } else {
                throw new Error("O campo 'quantidade' precisa ser um valor inteiro.");
            }
        }

        if (campos.foto && typeof campos.foto === "string" && campos.foto.trim() !== "") {
            camposAtualizar.foto = campos.foto.trim();
        } else if (campos.foto !== undefined) {
            throw new Error("O campo 'foto' precisa ser uma string válida.");
        }

        if (campos.qt_estrelas !== undefined) {
            if (typeof campos.qt_estrelas !== "number" || campos.qt_estrelas < 0 || campos.qt_estrelas > 5 || campos.qt_estrelas % 0.5 !== 0) {
                throw new Error("A quantidade de estrelas deve ser um número entre 0 e 5, múltiplo de 0.5.");
            }

            if (produto.qt_avaliacoes === 0) {
                camposAtualizar.media_avaliacao = campos.qt_estrelas;
                camposAtualizar.qt_avaliacoes = 1;
            } else {
                camposAtualizar.media_avaliacao = (produto.media_avaliacao * produto.qt_avaliacoes + campos.qt_estrelas) / (produto.qt_avaliacoes + 1);
                camposAtualizar.qt_avaliacoes = produto.qt_avaliacoes + 1;
            }
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
