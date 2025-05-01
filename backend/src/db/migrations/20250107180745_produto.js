/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.float('preco').notNullable();
      table.integer('quantidade').notNullable();
      table.string('foto').notNullable();
      table.float('media_avaliacao').notNullable();//sumiu
      table.integer('qt_avaliacoes');//sumiu
      table.float('qt_estrelas');//sumiu
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("produto");
  };
  