/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
  await knex.schema.alterTable("produto", async (table)=>{
        table.dropColumn("media_avaliacao");
        table.dropColumn("qt_avaliacoes");
        table.dropColumn("qt_estrelas");
  });
  await knex.schema.alterTable("produto",async(table)=>{
      table.float("media_avaliacao").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("produto");
};
