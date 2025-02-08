/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', function(table) {
        table.integer('id_produto').unsigned().notNullable();
        table.integer('id_pedido').unsigned().notNullable();
        table.integer('quantidade').notNullable();

        table.primary(['id_produto', 'id_pedido']);

        table.foreign('id_produto').references('id').inTable('produto').onDelete('CASCADE');
        table.foreign('id_pedido').references('id').inTable('pedido').onDelete('CASCADE');
      }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }   
 */
exports.down = function(knex) {
  
};
