/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("equipe", (table) => {
    table.enu('equipe', ['GESTAO', 'MARKETING', 'ROCKETWOLF', 'WOLFPOWER', 'WOLFBOTZ', 'SOCIALWOLF', 'WOLFBYTE', 'WIE']).notNullable();
    table.integer('id_usuario').unsigned().notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('equipe');
};
