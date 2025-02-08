/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pedido', function(table) {
      table.increments('id').primary();
      table.timestamp('data').defaultTo(knex.fn.now());
      table.string('mensagem').notNullable();
      table.enu('estado_pedido', ['EM_ANALISE', 'CONFIRMADO', 'CANCELADO', 'ENTREGUE'], {
        enumName: 'estado_pedido'
      }).defaultTo('EM_ANALISE');
      table.string('comprovante').notNullable();
      table.string('metodo_pagamento').notNullable();
      table.float('preco_final').notNullable;
      
      table.integer('id_usuario').unsigned().references('id').inTable('cliente');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("pedido");

};
