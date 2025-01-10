/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.float('preco').notNullable();
      table.boolean('disponivel').notNullable();
      table.string('imagem').notNullable();
      table.float('media_avaliacao').notNullable();
      table.integer('qt_avaliacoes');
      table.float('qt_estrelas');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("produto");
  };
  