
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
*/
exports.seed = async function(knex) {
  const bcrypt = require('bcrypt');
  // Deletes ALL existing entries
  await knex('administrador').del()
  await knex('administrador').insert([
    {
      id: 1,
      nome: 'Carlinhos', 
      cargo: JSON.stringify('secretario'), 
      cpf: process.env.CPF_ADM,
      telefone: process.env.TELEFONE_ADM, 
      senha: await bcrypt.hash(process.env.SENHA_ADM,11)
    },
  ]);
};
