/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("avaliacao", function(table){
        table.integer('id_produto').unsigned().notNullable().references('id').inTable('produto');;
        table.integer('id_usuario').unsigned().notNullable().references('id').inTable('cliente');
        table.float("qt_estrelas").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("avaliacao");
};
