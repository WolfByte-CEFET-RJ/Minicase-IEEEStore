/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  table.string("nome_destinatario").notNullable();
  table.string("chave_pix").notNullable();
  table.string("link_checkout").notNullable();

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
