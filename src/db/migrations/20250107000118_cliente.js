/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cliente', function(table){
        table.increments('id');
        table.string('nome').notNullable();
        table.string('cpf',11).notNullable().unique();
        table.integer('idade').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable().unique();
        table.json('cargo');
        table.boolean('membro_pagante').notNullable();
        table.string('senha').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('cliente');
};
