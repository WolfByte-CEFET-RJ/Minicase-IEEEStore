
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
*/
exports.seed = async function(knex) {
  const bcrypt = require('bcrypt');
  // Deletes ALL existing entries
  await knex('metodo_pagamento').del()
  await knex('metodo_pagamento').insert([
    {
      nome_destinatario: 'Carlinhos', 
      chave_pix: "exemplodechave@gmail.com", 
      link_checkout: "https://exemplo_de_link.com"
      
    },
  ]);
};