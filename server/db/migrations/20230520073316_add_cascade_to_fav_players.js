/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('notes', function(table) {
        table.dropForeign('fav_player_id');
        table.foreign('fav_player_id').references('id').inTable('fav_players').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('notes', function(table) {
        table.dropForeign('fav_player_id');
        table.foreign('fav_player_id').references('id').inTable('fav_players');
    });
};
