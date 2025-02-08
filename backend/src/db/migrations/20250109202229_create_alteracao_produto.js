/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('alteracao_produto', function(table) {
        table.increments('id').primary();
        table.integer('id_adm').unsigned().references('id').inTable('administrador');
        table.integer('id_produto').unsigned().references('id').inTable('produto');
        table.float('novo_valor').notNullable();
        table.timestamp('data_alteracao').defaultTo(knex.fn.now());

      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("alteracao_produto");
};
