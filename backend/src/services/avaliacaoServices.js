const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const { configDotenv } = require("dotenv");
const { get } = require("../routes/routes.js");
const path = require("path");
configDotenv();


async function verAvaliacoes(){
    try{
      const verTodasAvaliacoes= await knex("avaliacao").select("*");
      if(!verTodasAvaliacoes){
        throw new Error("Sem pedidos");
      }
      return {message: "Avaliações feitas:", verTodasAvaliacoes};
    }catch(err){
      
      throw err;
    
    }
  }
async function verAvaliacoesProduto(id_produto){
  try{
    const verTodasAvaliacoes_produto= await knex("avaliacao").where({id_produto}).select("*");
    const resultado = await knex("avaliacao").where({ id_produto }).avg("qt_estrelas as media_avaliacoes").first();
    if (verTodasAvaliacoes_produto.length === 0) {
      throw new Error("Nenhuma avaliação encontrada para este produto.");
    }
    return {
      media_avaliacoes: resultado.media_avaliacoes,
      avaliacoes: verTodasAvaliacoes_produto
    }; 
   }catch(err){
    
    throw err;
  
  }


}

async function createAvaliacao(id_produto, id_usuario, qt_estrelas) {
  
  const produtoExistente = await knex("produto").where({id: id_produto}).first();
  if(!produtoExistente){
    throw new Error("Não existe produto com esse id no banco");
  }
  const usuarioExistente = await knex("cliente").where({id: id_usuario}).first();
  if(!usuarioExistente){
    throw new Error("Não existe usuário com esse id no banco");
  }
  if (typeof qt_estrelas !== 'number' || qt_estrelas < 0 || qt_estrelas > 5) {
    throw new Error('A avaliação deve estar entre 0.0 e 5.0');
  }
  const avaliacaoExistente = await knex("avaliacao")
  .where({ id_produto, id_usuario })
  .first();

  if (avaliacaoExistente) {
  throw new Error("Você já avaliou este produto.");
  } 
    await knex('avaliacao').insert({
      id_produto,
      id_usuario,
      qt_estrelas
      
    });
  
    return { message: 'Avaliação registrada com sucesso!' };
  }
  
  async function updateAvaliacao(id_produto, id_usuario, qt_estrelas) {
    const avaliacaoExistente = await knex("avaliacao")
      .where({ id_produto, id_usuario })
      .first();
  
    if (!avaliacaoExistente) {
      throw new Error("Você ainda não avaliou este produto.");
    }
  
    if (typeof qt_estrelas !== 'number' || qt_estrelas < 0 || qt_estrelas > 5) {
      throw new Error("A avaliação deve estar entre 0.0 e 5.0");
    }
  
    await knex("avaliacao")
      .where({ id_produto, id_usuario })
      .update({ qt_estrelas });
  
    return { message: "Avaliação atualizada com sucesso!" };
  }

  async function deleteAvaliacao(id_produto, id_usuario) {
    const avaliacaoExistente = await knex("avaliacao")
      .where({ id_produto, id_usuario })
      .first();
  
    if (!avaliacaoExistente) {
      throw new Error("Você ainda não avaliou este produto.");
    }
  
    await knex("avaliacao")
      .where({ id_produto, id_usuario })
      .del();
  
    return { message: "Avaliação removida com sucesso!" };
  }




  module.exports = {
    verAvaliacoes,
    verAvaliacoesProduto,
    createAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,

  };