/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('alteracao_estado_pedido', function(table) {
        table.increments('id').primary();
        table.integer('id_adm').unsigned().references('id').inTable('administrador');
        table.integer('id_pedido').unsigned().references('id').inTable('pedido');
        table.enu('estado_pedido', ['EM_ANALISE', 'CONFIRMADO', 'CANCELADO', 'ENTREGUE'], {
            enumName: 'estado_pedido'
          }).defaultTo('EM_ANALISE');
        table.timestamp('data_alteracao').defaultTo(knex.fn.now());

      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
