const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const { configDotenv } = require("dotenv");
const { get } = require("../routes/routes.js");
const path = require("path");
configDotenv();

async function serveImage(id){                  
    try{        
        const get_image = await knex("produto").select("foto").where({id}).first();
        const fileName = path.basename(get_image.foto);
        const imagePath = path.resolve(__dirname, '../../fotosProduto', fileName);
        return imagePath;
    }catch(err){
        return {status:false, message:"Erro ao buscar imagem"}
    }
}

async function viewAlteracao(dataInicio,dataFim) {
    try {
        const alteracao= await knex("alteracao_produto").where("data_alteracao",'>=',dataInicio).where("data_alteracao",'<',dataFim);
        if (alteracao.length === 0) {
            throw new Error("Não foi possível encontrar alteracoes");
        }

        return alteracao;

    } catch (erro) {
        throw (erro);
    }
}

async function viewProdutoId(id) {
    try {
        console.log("ID recebido:", id);
        const produto = await knex("produto").select("id", "nome", "preco", "quantidade", "foto").where({ id }).first();
        const media = await knex("avaliacao").where({ id_produto: id }).avg("qt_estrelas as media_avaliacoes").first();
        const quantidade_avaliacoes = await knex("avaliacao").where({ id_produto: id }).count("* as total").first();
        const avaliacoes= await knex("avaliacao").where({id_produto: id}).select("id_usuario", "qt_estrelas");

        console.log("Produto:", produto, "Média de avaiações:", media,"Numero de avaliações:", quantidade_avaliacoes, "Avaliações: " , avaliacoes);   
        
        if (!produto) {
            throw new Error("Não foi possível encontrar um produto com esse id.");
        }
        return {
        produto,
        media_avaliacoes: media?.media_avaliacoes || null,
        avaliacoes,
        quantidade_avaliacoes 
        };
    } catch (erro) {
        console.error("Erro:", erro.message);
        throw erro;
    }
}

async function viewAllProduto(){
    try{
    const produto = await knex("produto").select("id", "nome", "preco", "quantidade", "foto");

        if (produto.length === 0){
            throw new Error("Sem produtos no registro.");
        }

        const produtosComMedia = await Promise.all(produto.map(async (produto) => {
        const resultado = await knex("avaliacao").where({ id_produto: produto.id }).avg("qt_estrelas as media_avaliacoes").first();

      return {
        produto,
        media_avaliacoes: resultado.media_avaliacoes || 0 };
    }));

    return produtosComMedia;

    }catch(erro){
        throw(erro);
    }
}

async function createProduto({ nome, preco, quantidade, foto, media_avaliacao}) {
    try {
        const produtoExistente = await knex("produto").select("*").where({ nome }).first();
        if(produtoExistente){
            throw new Error("Já existe um produto com esse nome.");
        } 
        if(nome === "" || preco === "" || quantidade === ""){
            throw new Error("preencha todos os campos obrigatórios");
        }
        if(!foto){
            throw new Error("Foto do produto é obrigatória.");
        }
        if (typeof preco !== 'number' || preco <= 0) {
            throw new Error("O preço do produto deve ser um número positivo.");
        }
        
        if (!Number.isInteger(quantidade)) {
            throw new Error("O campo 'quantidade' deve ser um valor inteiro.");
        }
        
        if(media_avaliacao != undefined){
            throw new Error("não dê um valor para media avaliacao");
        }

     const [id] = await knex('produto').insert({
        nome, preco, quantidade, foto, media_avaliacao: 0
    });
    return{
        message: "Produto criado com sucesso.",
        id
    };

    } catch (erro) {
        console.error("Erro no service:", erro.message);
        throw new Error("Falha ao criar o produto.");
    }
}

async function alteracaoProduto(id,id_adm){
    try{
        const resultado = await knex("produto").select("preco").where({ id }).first();
        
        if (!resultado || resultado.preco === null || resultado.preco === undefined) {
            throw new Error("Preço não encontrado.");
        }
        const valor_att = parseFloat(resultado.preco);

        const alterar = await knex("alteracao_produto").insert({id_produto: id,id_adm, novo_valor:valor_att});
        if(!alterar){
            throw new Error("Falha ao salvar alteracao.");
        }
    }catch(error){
        console.log("Erro no service", error.message);
        throw new Error("Falha ao alterar produto.")
    }
}

async function updateProduto(id,id_adm,nome, preco, quantidade, foto) {
    try {
        const produto = await knex("produto").select("*").where({ id }).first();
        if (!produto) {
            return { status: false, message: "Produto não encontrado." };
        }

        const camposAtualizar = {};

        if (nome !== undefined && typeof nome === "string") {
            camposAtualizar.nome = nome.trim();
        }

        if (preco !== undefined) {
            const precoFloat = parseFloat(preco);
            if (!isNaN(precoFloat) && precoFloat > 0) {
                camposAtualizar.preco = precoFloat;
            }
        }

        if (quantidade !== undefined) {
            const quantidadeInt = parseInt(quantidade);
            if (!isNaN(quantidadeInt)) {
                camposAtualizar.quantidade = quantidadeInt;
            }
        }

        if (foto !== undefined && typeof foto === "string" && foto.trim() !== "") {
            camposAtualizar.foto = foto.trim();
        }

        if (Object.keys(camposAtualizar).length === 0) {
            return { status: false, message: "Nenhum campo válido para atualização." };
        }

        await knex("produto").where({ id }).update(camposAtualizar);
        if(camposAtualizar.preco){
            const result = alteracaoProduto(id,id_adm);
            if(!result){
                return {status:false, message:"Erro ao adicionar alteracao."}
            }
        }
        
        return { status: true, message: "Produto atualizado com sucesso!" };

    } catch (error) {
        return { status: false, message: error.message };
    }
}



async function deleteProduto(id) {
    try {
  
      const ProdutoExistente = await knex("produto").select("*").where({ id });
      
      if (!ProdutoExistente) {
        throw new Error("Produto não encontrado.");
      }
  
      await knex("alteracao_produto").where({ id_produto: id }).del();
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
    deleteProduto,
    alteracaoProduto,
    viewAlteracao,
    serveImage,
};
