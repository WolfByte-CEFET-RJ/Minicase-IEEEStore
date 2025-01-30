/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('administrador').del()
  await knex('administrador').insert([
    {
      id: 1,
      nome: 'Carlinhos', 
      cargo: JSON.stringify('secretario'), 
      cpf: '11111111111',
      telefone: "21123454321", 
      senha: '1233221'
    },
    {
      id: 2,
      nome: 'Rony', 
      cargo: JSON.stringify('secretario'), 
      cpf: '10987654321',
      telefone: "21123454323", 
      senha: '1233221'
    },
    {
      id: 3,
      nome: 'Gilberto', 
      cargo: JSON.stringify('secretario'), 
      cpf: '12345678910',
      telefone: "21123454322", 
      senha: '1233221'
    },
  ]);
};
