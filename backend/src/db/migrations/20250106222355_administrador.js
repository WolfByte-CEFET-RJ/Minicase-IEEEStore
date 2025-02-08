/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('administrador', function(table){
        table.increments('id');
        table.string('nome').notNullable();
        table.json('cargo').notNullable();
        table.string('cpf',11).notNullable().unique();
        table.string('telefone').notNullable();
        table.string('senha').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('administrador'); 
};