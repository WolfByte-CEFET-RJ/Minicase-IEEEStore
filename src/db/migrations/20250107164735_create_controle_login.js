/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('controle_login', (table) => {
    table.increments("id_controle").notNullable().primary();
    table.integer('id_cliente').unsigned().references("id").inTable("cliente");
    table.integer("id_admin").unsigned().references("id").inTable("administrador");
    table.timestamp('hora_login').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
