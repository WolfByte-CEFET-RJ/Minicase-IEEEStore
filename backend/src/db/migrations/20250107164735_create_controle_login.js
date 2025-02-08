/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('controle_login', (table) => {
    table.increments("id_controle").notNullable().primary();
    table.integer('id_pessoa').notNullable().unsigned();
    table.timestamp('hora_login').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("controle_login");
};
