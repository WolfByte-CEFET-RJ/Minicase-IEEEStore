/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("metodo_pagamento", function(table){
    table.string("nome_destinatario").notNullable();
    table.string("chave_pix").notNullable();
    table.string("link_checkout").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("metodo_pagamento");
};
